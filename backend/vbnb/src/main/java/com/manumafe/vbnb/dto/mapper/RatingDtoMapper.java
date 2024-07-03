package com.manumafe.vbnb.dto.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.ListingRatingDto;
import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.dto.UserDto;
import com.manumafe.vbnb.entity.Rating;

@Component
public class RatingDtoMapper {

    @Autowired
    private UserDtoMapper userDtoMapper;

    public RatingDto toDto(Rating rating) {
        return new RatingDto(
                rating.getRating(),
                rating.getComment());
    }

    public ListingRatingDto toListingRatingDto(Rating rating) {
        UserDto user = userDtoMapper.toDto(rating.getUser());

        return new ListingRatingDto(
                rating.getRating(),
                rating.getComment(),
                user);
    }
}
