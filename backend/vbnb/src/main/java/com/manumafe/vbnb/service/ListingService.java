package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.ListingDto;

public interface ListingService {
    
    ListingDto saveListing(ListingDto listing);

    void deleteListing(Long id);

    ListingDto findListingById(Long id);

    List<ListingDto> findAllListings();
}
