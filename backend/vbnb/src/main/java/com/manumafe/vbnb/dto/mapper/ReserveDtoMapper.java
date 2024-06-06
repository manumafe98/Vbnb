package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.entity.Reserve;

@Component
public class ReserveDtoMapper {

    public ReserveDto toDto(Reserve reserve) {
        return new ReserveDto(
                reserve.getCheckInDate(),
                reserve.getCheckOuDate(),
                reserve.getUser().getId(),
                reserve.getListing().getId());
    }
}
