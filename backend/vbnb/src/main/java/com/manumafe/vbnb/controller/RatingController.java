package com.manumafe.vbnb.controller;

import java.util.List;

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

import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.dto.RatingListingInformationDto;
import com.manumafe.vbnb.service.RatingService;

@RestController
@RequestMapping("/api/v1/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    public ResponseEntity<RatingDto> creteRating(
            @RequestParam("listingId") Long listingId,
            @RequestParam("userEmail") String userEmail,
            @RequestBody RatingDto ratingDto) {

        RatingDto rating = ratingService.createRating(listingId, userEmail, ratingDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(rating);
    }

    @PutMapping
    public ResponseEntity<RatingDto> updateRating(
        @RequestParam("listingId") Long listingId,
        @RequestParam("userEmail") String userEmail,
        @RequestBody RatingDto ratingDto) {

        RatingDto rating = ratingService.updateRating(listingId, userEmail, ratingDto);

        return ResponseEntity.status(HttpStatus.OK).body(rating);
    }

    @GetMapping("/get/{listingId}")
    public ResponseEntity<List<RatingDto>> getRatingsByListingId(@PathVariable Long listingId) {
        List<RatingDto> ratings = ratingService.getRatingsByListingId(listingId);

        return ResponseEntity.status(HttpStatus.OK).body(ratings);
    }

    @GetMapping("/info/{listingId}")
    public ResponseEntity<RatingListingInformationDto> getAverageRating(@PathVariable Long listingId){
        RatingListingInformationDto averageRating = ratingService.getListingRatingInformation(listingId);

        return ResponseEntity.status(HttpStatus.OK).body(averageRating);
    }
}
