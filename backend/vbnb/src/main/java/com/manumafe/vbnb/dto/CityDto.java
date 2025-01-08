package com.manumafe.vbnb.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CityDto {
    private Long id;
    private String name;
    private String country;
}
