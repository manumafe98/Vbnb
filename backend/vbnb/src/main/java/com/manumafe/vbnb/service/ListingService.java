package com.manumafe.vbnb.service;

import java.time.LocalDate;
import java.util.List;

import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.dto.ListingFullDataDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface ListingService {

    ListingResponseDto saveListing(ListingCreateDto listingDto) throws ResourceAlreadyExistentException, ResourceNotFoundException;

    void deleteListing(Long id) throws ResourceNotFoundException;

    ListingResponseDto updateListing(Long id, ListingCreateDto listingDto) throws ResourceNotFoundException;

    ListingResponseDto findListingById(Long id) throws ResourceNotFoundException;

    List<ListingResponseDto> findAllListings();

    List<ListingFullDataDto> findAllListingsFullData();

    List<ListingResponseDto> findListingByCategoryName(String categoryName) throws ResourceNotFoundException;

    List<ListingResponseDto> findListingByCityName(String cityName) throws ResourceNotFoundException;

    List<ListingResponseDto> findAvailableListingsByRangeDates(LocalDate checkInDate, LocalDate checkOutDate);

    List<ListingResponseDto> findListingByCityNameAndCategoryName(String cityName, String categoryName) throws ResourceNotFoundException;

    List<ListingResponseDto> findAvailableListingsByRangeDatesAndCityName(LocalDate checkInDate, LocalDate checkOutDate, String cityName) throws ResourceNotFoundException;

    List<ListingResponseDto> findAvailableListingsByRangeDatesAndCategoryName(LocalDate checkInDate, LocalDate checkOutDate, String categoryName) throws ResourceNotFoundException;

    List<ListingResponseDto> findAvailableListingsByRangeDatesAndCategoryNameAndCityName(LocalDate checkInDate, LocalDate checkOutDate, String categoryName, String cityName) throws ResourceNotFoundException;
}
