package com.manumafe.vbnb.dto;

import java.time.LocalDate;

public record UserReserveDto(
        LocalDate checkInDate,
        LocalDate checkOutDate,
        ListingResponseDto listing) {
}
