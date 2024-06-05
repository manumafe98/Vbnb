package com.manumafe.vbnb.dto;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.entity.Rating;

@Component
public class RatingDtoMapper {
    public RatingDto toDto(Rating rating) {
        return new RatingDto(rating.getAverageRating());
    }
}
