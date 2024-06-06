package com.manumafe.vbnb.dto.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.entity.Listing;

@Component
public class ListingDtoMapper {

    @Autowired
    private CharacteristicDtoMapper characteristicDtoMapper;

    public ListingResponseDto toResponseDto(Listing listing) {
        
        Set<CharacteristicDto> characteristicDtos = listing.getCharacteristics().stream()
                .map(characteristicDtoMapper::toDto).collect(Collectors.toSet());

        return new ListingResponseDto(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getCity(),
                listing.getCategory(),
                listing.getImages(),
                characteristicDtos);
    }
}
