package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.entity.ListingCharacteristic;

@Component
public class CharacteristicDtoMapper {

    public CharacteristicDto toDto(ListingCharacteristic listingCharacteristic) {
        return new CharacteristicDto(
                listingCharacteristic.getCharacteristic().getName(),
                listingCharacteristic.getCharacteristic().getImageUrl());
    }

    public CharacteristicDto toDto(Characteristic characteristic) {
        return new CharacteristicDto(
                characteristic.getName(),
                characteristic.getImageUrl());
    }
}
