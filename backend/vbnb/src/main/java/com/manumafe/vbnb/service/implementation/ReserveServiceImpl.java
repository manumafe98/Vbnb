package com.manumafe.vbnb.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.dto.UserReserveDto;
import com.manumafe.vbnb.dto.mapper.ReserveDtoMapper;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.entity.ReserveId;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.exceptions.ListingUnavailableForReserves;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.ReserveRepository;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.ReserveService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReserveServiceImpl implements ReserveService {

    private final ReserveRepository reserveRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final ReserveDtoMapper reserveDtoMapper;

    @Override
    @Transactional
    public ReserveDto saveReserve(String userEmail, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException, ListingUnavailableForReserves {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        List<Listing> availableListings = listingRepository.findAvailableListings(reserveDto.checkInDate(), reserveDto.checkOutDate());

        if (!availableListings.contains(listing)) {
            throw new ListingUnavailableForReserves("Listing already reserved for those dates");
        }

        ReserveId reserveId = new ReserveId(user.getId(), listingId);

        Optional<Reserve> optinalReserve = reserveRepository.findById(reserveId);

        if (optinalReserve.isPresent()) {
            throw new ResourceAlreadyExistentException("Reserve with id: " + reserveId + " already exists");
        }

        Reserve reserve = new Reserve();
        
        reserve.setId(reserveId);
        reserve.setCheckInDate(reserveDto.checkInDate());
        reserve.setCheckOutDate(reserveDto.checkOutDate());
        reserve.setUser(user);
        reserve.setListing(listing);

        user.getReserves().add(reserve);
        listing.getReserves().add(reserve);

        listingRepository.save(listing);
        userRepository.save(user);
        reserveRepository.save(reserve);

        return reserveDtoMapper.toDto(reserve);
    }

    @Override
    @Transactional
    public void deleteReserve(String userEmail, Long listingId) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        ReserveId reserveId = new ReserveId(user.getId(), listingId);
        Reserve reserve = reserveRepository.findById(reserveId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveId + " notfound"));

        Listing listing = reserve.getListing();

        listing.getReserves().remove(reserve);
        user.getReserves().remove(reserve);

        listingRepository.save(listing);
        userRepository.save(user);
        reserveRepository.deleteById(reserveId);
    }

    @Override
    @Transactional
    public ReserveDto updateReserve(String userEmail, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        ReserveId reserveId = new ReserveId(user.getId(), listingId);

        Reserve reserveToUpdate = reserveRepository.findById(reserveId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveId + " not found"));

        Listing listing = reserveToUpdate.getListing();

        listing.getReserves().remove(reserveToUpdate);
        user.getReserves().remove(reserveToUpdate);

        reserveToUpdate.setCheckInDate(reserveDto.checkInDate());
        reserveToUpdate.setCheckOutDate(reserveDto.checkOutDate());

        user.getReserves().add(reserveToUpdate);
        listing.getReserves().add(reserveToUpdate);

        listingRepository.save(listing);
        userRepository.save(user);
        reserveRepository.save(reserveToUpdate);

        return reserveDto;
    }

    @Override
    public List<UserReserveDto> findReservesByUserEmail(String userEmail) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        return reserveRepository.findByUser(user).stream().map(reserveDtoMapper::toUserReserveDto).toList();
    }

    @Override
    public List<UserReserveDto> findCurrentReservesByUserEmail(String userEmail) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));
        
        return reserveRepository.findCurrentReserves(user, LocalDate.now()).stream().map(reserveDtoMapper::toUserReserveDto).toList();
    }
}
