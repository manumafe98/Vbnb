package com.manumafe.vbnb.dto.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.CategoryDto;
import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.dto.CityDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
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
                city,
                category,
                listing.getImages(),
                characteristicDtos);
    }
}
