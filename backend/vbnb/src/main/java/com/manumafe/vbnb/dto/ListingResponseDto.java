package com.manumafe.vbnb.dto;

import java.util.Set;

import com.manumafe.vbnb.entity.Image;

public record ListingResponseDto(
        Long id,
        String title,
        String description,
        CityDto city,
        CategoryDto category,
        Set<Image> images,
        Set<CharacteristicDto> characteristics) {
}
