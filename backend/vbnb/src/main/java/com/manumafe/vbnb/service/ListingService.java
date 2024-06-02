package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.entity.Listing;

public interface ListingService {
    
    public Listing saveListing(Listing listing);

    public List<Listing> findAllListings();
}
