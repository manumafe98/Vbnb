package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.RatingCreateDto;
import com.manumafe.vbnb.entity.Rating;

@Component
public class RatingDtoMapper {

    public RatingCreateDto toDto(Rating rating) {
        return new RatingCreateDto(
                rating.getRating());
    }
}
