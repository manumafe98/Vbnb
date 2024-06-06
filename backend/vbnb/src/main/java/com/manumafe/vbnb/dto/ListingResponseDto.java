package com.manumafe.vbnb.dto;

import java.util.Set;

import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.entity.Image;

public record ListingResponseDto(
        Long id,
        String title,
        String description,
        City city,
        Category category,
        Set<Image> images,
        Set<CharacteristicDto> characteristics) {
}
