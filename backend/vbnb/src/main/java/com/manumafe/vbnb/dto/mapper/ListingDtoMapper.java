package com.manumafe.vbnb.dto.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.CategoryDto;
import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.dto.CityDto;
import com.manumafe.vbnb.dto.ListingFullDataDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.entity.Favorite;
import com.manumafe.vbnb.entity.FavoriteId;
import com.manumafe.vbnb.entity.Listing;

@Component
public class ListingDtoMapper {

    @Autowired
    private CharacteristicDtoMapper characteristicDtoMapper;

    @Autowired
    private CityDtoMapper cityDtoMapper;

    @Autowired
    private CategoryDtoMapper categoryDtoMapper;

    public ListingResponseDto toResponseDto(Listing listing) {

        CategoryDto category = categoryDtoMapper.toDto(listing.getCategory());

        CityDto city = cityDtoMapper.toDto(listing.getCity());

        Set<CharacteristicDto> characteristicDtos = listing.getCharacteristics().stream()
                .map(characteristicDtoMapper::toDto).collect(Collectors.toSet());

        return new ListingResponseDto(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getOwnerPhoneNumber(),
                city,
                category,
                listing.getImages(),
                characteristicDtos);
    }

    public ListingFullDataDto toFullDataDto(Listing listing) {

        CategoryDto category = categoryDtoMapper.toDto(listing.getCategory());

        CityDto city = cityDtoMapper.toDto(listing.getCity());

        Set<CharacteristicDto> characteristicDtos = listing.getCharacteristics().stream()
                .map(characteristicDtoMapper::toDto).collect(Collectors.toSet());

        Set<FavoriteId> favoriteIds = listing.getFavorites().stream().map(Favorite::getId).collect(Collectors.toSet());

        return new ListingFullDataDto(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getOwnerPhoneNumber(),
                city,
                category,
                listing.getImages(),
                characteristicDtos,
                listing.getReserves(),
                favoriteIds);
    }
}
