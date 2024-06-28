package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.dto.RatingListingInformationDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface RatingService {
    
    RatingDto createRating(Long listingId, String userEmail, RatingDto ratingDto) throws ResourceNotFoundException;

    RatingDto updateRating(Long listingId, String userEmail, RatingDto ratingDto) throws ResourceNotFoundException;

    List<RatingDto> getRatingsByListingId(Long listingId) throws ResourceNotFoundException;

    RatingListingInformationDto getListingRatingInformation(Long listingId) throws ResourceNotFoundException;
}
