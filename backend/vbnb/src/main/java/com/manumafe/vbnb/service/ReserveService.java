package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface ReserveService {
    ReserveDto saveReserve(Long userId, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException;

    void deleteReserve(Long userId, Long listingId) throws ResourceNotFoundException;

    ReserveDto updateReserve(Long userId, Long listingId, ReserveDto reserveDto) throws ResourceNotFoundException;

    List<ReserveDto> findReservesByUserId(Long userId) throws ResourceNotFoundException;
}
