package com.manumafe.vbnb.service;

import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface RatingService {
    
    RatingDto saveOrUpdateRating(Long listingId, String userEmail, RatingDto ratingDto) throws ResourceNotFoundException;

    RatingDto calculateListingAverageRating(Long listingId) throws ResourceNotFoundException;
}
