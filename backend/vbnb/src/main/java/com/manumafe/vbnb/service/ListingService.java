package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.dto.ListingResponseDto;

public interface ListingService {
    
    ListingResponseDto saveListing(ListingCreateDto listingDto);

    void deleteListing(Long id);

    ListingResponseDto updateListing(Long id, ListingCreateDto listingDto);

    ListingResponseDto findListingById(Long id);

    List<ListingResponseDto> findAllListings();
}
