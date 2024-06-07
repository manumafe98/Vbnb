package com.manumafe.vbnb.service.implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.dto.mapper.RatingDtoMapper;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Rating;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.RatingRepository;
import com.manumafe.vbnb.service.RatingService;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private RatingDtoMapper ratingDtoMapper;

    @Override
    public RatingDto saveRating(Long listingId, RatingDto ratingDto) throws ResourceNotFoundException {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        Optional<Rating> optinalRating = ratingRepository.findByListing(listing);
        Rating rating;

        if (optinalRating.isPresent()) {

            rating = optinalRating.get();
            rating.setTotalRating(rating.getTotalRating() + ratingDto.rating());
            rating.setTimesRated(rating.getTimesRated() + 1);
            rating.setAverageRating((double) rating.getTotalRating() / rating.getTimesRated());

        } else {
            rating = new Rating();
            rating.setId(ratingRepository.count() + 1);
            rating.setTimesRated(1);
            rating.setTotalRating(ratingDto.rating());
            rating.setAverageRating(ratingDto.rating());
        }

        ratingRepository.save(rating);

        return ratingDtoMapper.toDto(rating);
    }
}
