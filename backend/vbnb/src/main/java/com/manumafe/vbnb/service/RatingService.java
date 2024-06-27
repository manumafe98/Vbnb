package com.manumafe.vbnb.service;

import com.manumafe.vbnb.dto.RatingCreateDto;
import com.manumafe.vbnb.dto.RatingResponseDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface RatingService {
    
    RatingCreateDto createRating(Long listingId, String userEmail, RatingCreateDto ratingDto) throws ResourceNotFoundException;

    RatingCreateDto updateRating(Long listingId, String userEmail, RatingCreateDto ratingDto) throws ResourceNotFoundException;

    RatingResponseDto getListingRatingInformation(Long listingId) throws ResourceNotFoundException;
}
