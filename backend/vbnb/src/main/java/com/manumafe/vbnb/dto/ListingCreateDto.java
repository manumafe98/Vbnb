package com.manumafe.vbnb.dto;

import java.util.Set;

public record ListingCreateDto(
        String title,
        String description,
        String ownerPhoneNumber,
        Long cityId,
        Long categoryId,
        Set<String> images,
        Set<Long> characteristicIds) {
}
