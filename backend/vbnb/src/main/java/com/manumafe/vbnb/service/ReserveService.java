package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.dto.UserReserveDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface ReserveService {
    ReserveDto saveReserve(String userEmail, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException;

    void deleteReserve(String userEmail, Long listingId) throws ResourceNotFoundException;

    ReserveDto updateReserve(String userEmail, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException;

    List<UserReserveDto> findReservesByUserEmail(String userEmail) throws ResourceNotFoundException;
}
