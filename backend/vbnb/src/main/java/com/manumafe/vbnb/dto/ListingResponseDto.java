package com.manumafe.vbnb.dto;

import java.util.Set;

import com.manumafe.vbnb.entity.Image;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListingResponseDto {
    private Long id;
    private String title;
    private String description;
    private String ownerPhoneNumber;
    private CityDto city;
    private CategoryDto category;
    private Set<Image> images;
    private Set<CharacteristicDto> characteristics;
}
