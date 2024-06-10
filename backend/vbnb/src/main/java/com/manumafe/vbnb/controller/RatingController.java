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

import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.service.RatingService;

@RestController
@RequestMapping("/api/v1/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    @PutMapping
    public ResponseEntity<RatingDto> creteRating(
            @RequestParam("listingId") Long listingId,
            @RequestParam("userId") Long userId,
            @RequestBody RatingDto ratingDto) {

        RatingDto rating = ratingService.saveOrUpdateRating(listingId, userId, ratingDto);

        return ResponseEntity.status(HttpStatus.OK).body(rating);
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<RatingDto> getAverageRating(@PathVariable Long listingId){
        RatingDto averageRating = ratingService.calculateListingAverageRating(listingId);

        return ResponseEntity.status(HttpStatus.OK).body(averageRating);
    }
}
