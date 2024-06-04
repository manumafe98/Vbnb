package com.manumafe.vbnb.dto;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.entity.Reserve;

@Component
public class ReserveDtoMapper {

    public ReserveDto toDto(Reserve reserve) {
        return new ReserveDto(
                reserve.getId(),
                reserve.getCheckInDate(),
                reserve.getCheckOuDate(),
                reserve.getUser().getId(),
                reserve.getListing().getId());
    }
}
