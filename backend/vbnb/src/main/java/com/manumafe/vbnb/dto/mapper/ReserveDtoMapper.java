package com.manumafe.vbnb.dto.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.dto.UserReserveDto;
import com.manumafe.vbnb.entity.Reserve;

@Component
public class ReserveDtoMapper {

    @Autowired
    private ListingDtoMapper listingDtoMapper;

    public ReserveDto toDto(Reserve reserve) {
        return new ReserveDto(
                reserve.getCheckInDate(),
                reserve.getCheckOutDate());
    }

    public UserReserveDto toUserReserveDto(Reserve reserve) {
        ListingResponseDto listing = listingDtoMapper.toResponseDto(reserve.getListing());

        return new UserReserveDto(
                reserve.getId(),
                reserve.getCheckInDate(),
                reserve.getCheckOutDate(),
                listing);
    }
}
