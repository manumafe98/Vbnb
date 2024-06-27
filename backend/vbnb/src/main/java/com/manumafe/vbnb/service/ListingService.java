package com.manumafe.vbnb.service;

import java.time.LocalDate;
import java.util.List;

import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.dto.ListingFullDataDto;
import com.manumafe.vbnb.dto.ListingResponseDto;

public interface ListingService {

    ListingResponseDto saveListing(ListingCreateDto listingDto);

    void deleteListing(Long id);

    ListingResponseDto updateListing(Long id, ListingCreateDto listingDto);

    ListingResponseDto findListingById(Long id);

    List<ListingResponseDto> findAllListings();

    List<ListingFullDataDto> findAllListingsFullData();

    List<ListingResponseDto> findListingByCategoryName(String categoryName);

    List<ListingResponseDto> findListingByCityName(String cityName);

    List<ListingResponseDto> findAvailableListingsByRangeDates(LocalDate checkInDate, LocalDate checkOutDate);

    List<ListingResponseDto> findListingByCityNameAndCategoryName(String cityName, String categoryName);

    List<ListingResponseDto> findAvailableListingsByRangeDatesAndCityName(LocalDate checkInDate, LocalDate checkOutDate, String cityName);

    List<ListingResponseDto> findAvailableListingsByRangeDatesAndCategoryName(LocalDate checkInDate, LocalDate checkOutDate, String categoryName);

    List<ListingResponseDto> findAvailableListingsByRangeDatesAndCategoryNameAndCityName(LocalDate checkInDate, LocalDate checkOutDate, String categoryName, String cityName);
}
