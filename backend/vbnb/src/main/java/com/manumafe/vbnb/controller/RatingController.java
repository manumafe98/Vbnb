package com.manumafe.vbnb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manumafe.vbnb.dto.RatingCreateDto;
import com.manumafe.vbnb.dto.RatingResponseDto;
import com.manumafe.vbnb.service.RatingService;

@RestController
@RequestMapping("/api/v1/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    public ResponseEntity<RatingCreateDto> creteRating(
            @RequestParam("listingId") Long listingId,
            @RequestParam("userEmail") String userEmail,
            @RequestBody RatingCreateDto ratingDto) {

        RatingCreateDto rating = ratingService.createRating(listingId, userEmail, ratingDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(rating);
    }

    @PutMapping
    public ResponseEntity<RatingCreateDto> updateRating(
        @RequestParam("listingId") Long listingId,
        @RequestParam("userEmail") String userEmail,
        @RequestBody RatingCreateDto ratingDto) {

        RatingCreateDto rating = ratingService.updateRating(listingId, userEmail, ratingDto);

        return ResponseEntity.status(HttpStatus.OK).body(rating);
    }

    @GetMapping("/info/{listingId}")
    public ResponseEntity<RatingResponseDto> getAverageRating(@PathVariable Long listingId){
        RatingResponseDto averageRating = ratingService.getListingRatingInformation(listingId);

        return ResponseEntity.status(HttpStatus.OK).body(averageRating);
    }
}
