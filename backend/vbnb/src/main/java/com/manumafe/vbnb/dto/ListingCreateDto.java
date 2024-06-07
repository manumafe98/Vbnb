package com.manumafe.vbnb.dto;

import java.util.Set;

public record ListingCreateDto(
        String title,
        String description,
        Long cityId,
        Long categoryId,
        Set<ImageDto> images,
        Set<Long> characteristicIds
        ) {
}
