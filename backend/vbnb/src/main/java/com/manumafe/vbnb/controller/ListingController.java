package com.manumafe.vbnb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.service.ListingService;

@RestController
@RequestMapping("/api/v1/listing")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @PostMapping
    public ResponseEntity<ListingResponseDto> createListing(@RequestBody ListingCreateDto listingCreateDto) {
        ListingResponseDto listingResponseDto = listingService.saveListing(listingCreateDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(listingResponseDto);
    }

    @GetMapping
    public ResponseEntity<List<ListingResponseDto>> getListings() {
        List<ListingResponseDto> listings = listingService.findAllListings();

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListingResponseDto> updateListing(@RequestBody ListingCreateDto listingCreateDto,
            @PathVariable Long id) {
        ListingResponseDto listing = listingService.updateListing(id, listingCreateDto);

        return ResponseEntity.status(HttpStatus.OK).body(listing);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponseDto> getListingById(@PathVariable Long id) {
        ListingResponseDto listing = listingService.findListingById(id);

        return ResponseEntity.status(HttpStatus.OK).body(listing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListingById(@PathVariable Long id) {
        listingService.deleteListing(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
