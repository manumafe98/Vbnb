package com.manumafe.vbnb.dto;

import java.time.LocalDate;

public record UserReserveDto(
        Long id,
        LocalDate checkInDate,
        LocalDate checkOutDate,
        ListingResponseDto listing) {
}
