package com.manumafe.vbnb.dto;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.entity.Listing;

@Component
public class ListingDtoMapper {

    public ListingDto toDto(Listing listing) {
        return new ListingDto(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getCity().getId(),
                listing.getCategory().getId(),
                listing.getImages(),
                listing.getCharacteristics());
    }
}
