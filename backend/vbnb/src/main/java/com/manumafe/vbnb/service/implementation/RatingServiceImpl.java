package com.manumafe.vbnb.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.RatingCreateDto;
import com.manumafe.vbnb.dto.RatingResponseDto;
import com.manumafe.vbnb.dto.mapper.RatingDtoMapper;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Rating;
import com.manumafe.vbnb.entity.RatingId;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.RatingRepository;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.RatingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final RatingDtoMapper ratingDtoMapper;


    @Override
    @Transactional
    public RatingCreateDto createRating(Long listingId, String userEmail, RatingCreateDto ratingDto) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        Optional<Rating> optinalRating = ratingRepository.findByUserAndListing(user, listing);

        if (optinalRating.isPresent()) {
            throw new ResourceAlreadyExistentException("Rating already existent");
        }

        Rating rating = new Rating();
        RatingId ratingId = new RatingId(user.getId(), listingId);
        
        rating.setId(ratingId);
        rating.setRating(ratingDto.rating());
        rating.setListing(listing);
        rating.setUser(user);

        listing.getRating().add(rating);

        listingRepository.save(listing);
        ratingRepository.save(rating);

        return ratingDtoMapper.toDto(rating);
    }

    @Override
    @Transactional
    public RatingCreateDto updateRating(Long listingId, String userEmail, RatingCreateDto ratingDto) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + " not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        Rating rating = ratingRepository.findByUserAndListing(user, listing)
                .orElseThrow(() -> new ResourceNotFoundException("Rating of userId: " + user.getId() + " and listingId: " + listingId + " not found"));

        listing.getRating().remove(rating);
        rating.setRating(ratingDto.rating());
        listing.getRating().add(rating);

        listingRepository.save(listing);
        ratingRepository.save(rating);

        return ratingDtoMapper.toDto(rating);
    }

    @Override
    public RatingResponseDto getListingRatingInformation(Long listingId) throws ResourceNotFoundException {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        List<Rating> ratings = ratingRepository.findByListing(listing);

        Double average = ratings.stream().mapToDouble(Rating::getRating).average().orElse(0.0);

        return new RatingResponseDto(average, ratings.size());
    }
}
