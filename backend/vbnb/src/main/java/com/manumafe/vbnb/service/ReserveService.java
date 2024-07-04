package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.dto.UserReserveDto;
import com.manumafe.vbnb.exceptions.ListingUnavailableForReserves;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface ReserveService {
    ReserveDto saveReserve(String userEmail, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException, ListingUnavailableForReserves;

    void deleteReserve(Long reserveId) throws ResourceNotFoundException;

    ReserveDto updateReserve(Long reserveId, ReserveDto reserveDto) throws ResourceNotFoundException;

    List<ReserveDto> findByListingId(Long listingId) throws ResourceNotFoundException;

    List<UserReserveDto> findReservesByUserEmail(String userEmail) throws ResourceNotFoundException;

    List<UserReserveDto> findCurrentReservesByUserEmail(String userEmail) throws ResourceNotFoundException;
}
