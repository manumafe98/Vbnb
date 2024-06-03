package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.ListingDto;

public interface ListingService {
    
    public ListingDto saveListing(ListingDto listing);

    public List<ListingDto> findAllListings();
}
