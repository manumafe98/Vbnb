package com.manumafe.vbnb.dto;

import java.time.LocalDate;

public record ReserveDto(
        LocalDate checkInDate,
        LocalDate checkOutDate,
        Long userId,
        Long listingId) {
}
