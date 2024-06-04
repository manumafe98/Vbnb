package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.dto.ReserveDtoMapper;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.entity.ReserveId;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.ReserveRepository;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.ReserveService;

@Service
public class ReserveServiceImpl implements ReserveService {

    @Autowired
    private ReserveRepository reserveRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private ReserveDtoMapper reserveDtoMapper;

    @Override
    public ReserveDto saveReserve(Long userId, Long listingId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + " not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + userId + " not found"));

        ReserveId reserveId = new ReserveId(userId, listingId);

        Reserve reserve = new Reserve();
        reserve.setId(reserveId);
        reserve.setUser(user);
        reserve.setListing(listing);

        reserveRepository.save(reserve);

        return reserveDtoMapper.toDto(reserve);
    }

    @Override
    public void deleteReserve(Long userId, Long listingId) throws ResourceNotFoundException {
        ReserveId reserveId = new ReserveId(userId, listingId);
        reserveRepository.findById(reserveId)
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveId + " notfound"));

        reserveRepository.deleteById(reserveId);
    }

    @Override
    public ReserveDto updateReserve(ReserveDto reserveDto) throws ResourceNotFoundException {
        Reserve reserveToUpdate = reserveRepository.findById(reserveDto.id())
                .orElseThrow(() -> new ResourceNotFoundException("Reserve with id: " + reserveDto.id() + " not found"));

        reserveToUpdate.setCheckInDate(reserveDto.checkInDate());
        reserveToUpdate.setCheckOuDate(reserveDto.checkOutDate());

        reserveRepository.save(reserveToUpdate);

        return reserveDto;
    }

    @Override
    public List<ReserveDto> findReservesByUserId(Long userId) throws ResourceNotFoundException {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + " not found"));

        return reserveRepository.findByUserId(userId)
                .stream()
                .map(reserveDtoMapper::toDto)
                .toList();
    }
}
