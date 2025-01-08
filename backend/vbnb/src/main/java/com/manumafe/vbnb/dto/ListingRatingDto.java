package com.manumafe.vbnb.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListingRatingDto {
    private Double rating;
    private String comment;
    private UserDto user;
}
