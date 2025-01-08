package com.manumafe.vbnb.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReserveDto {
    LocalDate checkInDate;
    LocalDate checkOutDate;
}
