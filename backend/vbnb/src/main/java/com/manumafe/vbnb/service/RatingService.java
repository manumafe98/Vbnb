package com.manumafe.vbnb.service;

import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface RatingService {
    
    RatingDto saveRating(Long listingId, RatingDto ratingDto) throws ResourceNotFoundException;
}
