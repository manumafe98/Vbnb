package com.manumafe.vbnb.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.service.ListingService;

@RestController
@RequestMapping("/api/v1/listing")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @PostMapping("/create")
    public ResponseEntity<ListingResponseDto> createListing(@RequestBody ListingCreateDto listingCreateDto) {
        ListingResponseDto listingResponseDto = listingService.saveListing(listingCreateDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(listingResponseDto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ListingResponseDto>> getListings() {
        List<ListingResponseDto> listings = listingService.findAllListings();

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ListingResponseDto> updateListing(@RequestBody ListingCreateDto listingCreateDto,
            @PathVariable Long id) {
        ListingResponseDto listing = listingService.updateListing(id, listingCreateDto);

        return ResponseEntity.status(HttpStatus.OK).body(listing);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ListingResponseDto> getListingById(@PathVariable Long id) {
        ListingResponseDto listing = listingService.findListingById(id);

        return ResponseEntity.status(HttpStatus.OK).body(listing);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteListingById(@PathVariable Long id) {
        listingService.deleteListing(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ListingResponseDto>> getListingsByCategory(@PathVariable String category) {
        List<ListingResponseDto> listings = listingService.findListingByCategoryName(category);

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<ListingResponseDto>> getListingsByCity(@PathVariable String city) {
        List<ListingResponseDto> listings = listingService.findListingByCityName(city);

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }

    @GetMapping("/available")
    public ResponseEntity<List<ListingResponseDto>> getAvailableListings(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {

        List<ListingResponseDto> listings = listingService.findAvailableListingsByRangeDates(checkInDate, checkOutDate);

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }

    @GetMapping("/available/{city}")
    public ResponseEntity<List<ListingResponseDto>> getAvailableListingsByCity(
            @PathVariable String city,
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {

        List<ListingResponseDto> listings = listingService.findAvailableListingsByRangeDatesAndCityName(checkInDate, checkOutDate, city);

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }
}
