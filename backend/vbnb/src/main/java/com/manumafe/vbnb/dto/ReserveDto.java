package com.manumafe.vbnb.dto;

import java.time.LocalDate;

import com.manumafe.vbnb.entity.ReserveId;

public record ReserveDto(
                ReserveId id,
                LocalDate checkInDate,
                LocalDate checkOutDate,
                Long userId,
                Long listingId) {
}
