package com.manumafe.vbnb.dto;

import java.util.Set;

import com.manumafe.vbnb.entity.Image;

public record ListingCreateDto(
        String title,
        String description,
        Long cityId,
        Long categoryId,
        Set<Image> images,
        Set<Long> characteristicIds) {
}
