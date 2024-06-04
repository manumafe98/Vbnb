package com.manumafe.vbnb.dto;

public record ListingDto(
        Long id,
        String title,
        String description,
        Long cityId,
        Long categoryId) {
}
