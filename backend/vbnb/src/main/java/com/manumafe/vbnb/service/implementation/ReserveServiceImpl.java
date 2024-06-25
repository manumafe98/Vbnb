package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.dto.mapper.ReserveDtoMapper;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.entity.ReserveId;
import com.manumafe.vbnb.entity.User;
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
    public ReserveDto saveReserve(Long userId, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + " not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + userId + " not found"));

        ReserveId reserveId = new ReserveId(userId, listingId);

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
    public void deleteReserve(Long userId, Long listingId) throws ResourceNotFoundException {
        ReserveId reserveId = new ReserveId(userId, listingId);
        Reserve reserve = reserveRepository.findById(reserveId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveId + " notfound"));

        Listing listing = reserve.getListing();
        User user = reserve.getUser();

        listing.getReserves().remove(reserve);
        user.getReserves().remove(reserve);

        reserveRepository.deleteById(reserveId);
    }

    @Override
    @Transactional
    public ReserveDto updateReserve(Long userId, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException {
        ReserveId reserveId = new ReserveId(userId, listingId);

        Reserve reserveToUpdate = reserveRepository.findById(reserveId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveId + " not found"));

        Listing listing = reserveToUpdate.getListing();
        User user = reserveToUpdate.getUser();

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
    public List<ReserveDto> findReservesByUserId(Long userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + " not found"));

        return reserveRepository.findByUser(user)
                .stream()
                .map(reserveDtoMapper::toDto)
                .toList();
    }
}
