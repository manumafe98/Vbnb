package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.entity.Rating;

@Component
public class RatingDtoMapper {

    public RatingDto toDto(Rating rating) {
        return new RatingDto(rating.getAverageRating());
    }
}
