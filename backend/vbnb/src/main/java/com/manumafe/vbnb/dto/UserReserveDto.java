package com.manumafe.vbnb.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserReserveDto {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private ListingResponseDto listing;
}                             
