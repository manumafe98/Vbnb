package com.manumafe.vbnb.service.implementation;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.dto.UserReserveDto;
import com.manumafe.vbnb.dto.mapper.ReserveDtoMapper;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.exceptions.ListingUnavailableForReserves;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.ReserveRepository;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.EmailService;
import com.manumafe.vbnb.service.ReserveService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReserveServiceImpl implements ReserveService {

    private final ReserveRepository reserveRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final ReserveDtoMapper reserveDtoMapper;
    private final EmailService emailService;

    @Override
    public ReserveDto saveReserve(String userEmail, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException, ListingUnavailableForReserves {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        List<Listing> availableListings = listingRepository.findAvailableListings(reserveDto.getCheckInDate(), reserveDto.getCheckOutDate());

        if (!availableListings.contains(listing)) {
            throw new ListingUnavailableForReserves("Listing already reserved for those dates");
        }

        Reserve reserve = new Reserve();

        reserve.setCheckInDate(reserveDto.getCheckInDate());
        reserve.setCheckOutDate(reserveDto.getCheckOutDate());
        reserve.setUser(user);
        reserve.setListing(listing);

        reserveRepository.save(reserve);

        try {
            emailService.sendSucessfulReserveEmail(reserve);
        } catch (MessagingException e) {
            System.out.println(e);
        }

        return reserveDtoMapper.toDto(reserve);
    }

    @Override
    public void deleteReserve(Long reserveId) throws ResourceNotFoundException {
        reserveRepository.findById(reserveId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveId + " notfound"));

        reserveRepository.deleteById(reserveId);
    }

    @Override
    public ReserveDto updateReserve(Long reserveId, ReserveDto reserveDto) throws ResourceNotFoundException {
        Reserve reserveToUpdate = reserveRepository.findById(reserveId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveId + " not found"));

        List<Reserve> currentListingReservesWithoutUpdatedReserve = reserveToUpdate.getListing().getReserves().stream().filter(reserve -> reserve.getId() != reserveToUpdate.getId()).toList();

        for (Reserve reserve : currentListingReservesWithoutUpdatedReserve) {
            if (reserve.getCheckInDate().compareTo(reserveDto.getCheckOutDate()) <= 0 && reserve.getCheckOutDate().compareTo(reserveDto.getCheckInDate()) >= 0) {
                throw new ListingUnavailableForReserves("Listing already reserved for those dates");
            }
        }

        reserveToUpdate.setCheckInDate(reserveDto.getCheckInDate());
        reserveToUpdate.setCheckOutDate(reserveDto.getCheckOutDate());

        reserveRepository.save(reserveToUpdate);

        return reserveDto;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserReserveDto> findReservesByUserEmail(String userEmail) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        return reserveRepository.findByUser(user).stream().map(reserveDtoMapper::toUserReserveDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserReserveDto> findCurrentReservesByUserEmail(String userEmail) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        return reserveRepository.findCurrentReserves(user, LocalDate.now()).stream().map(reserveDtoMapper::toUserReserveDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReserveDto> findByListingId(Long listingId) throws ResourceNotFoundException {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        return reserveRepository.findByListing(listing).stream().map(reserveDtoMapper::toDto).toList();
    }
}
