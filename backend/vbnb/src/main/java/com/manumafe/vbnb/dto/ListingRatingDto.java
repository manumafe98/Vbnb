package com.manumafe.vbnb.dto;

public record ListingRatingDto(
        Double rating,
        String comment,
        UserDto user) {
}
