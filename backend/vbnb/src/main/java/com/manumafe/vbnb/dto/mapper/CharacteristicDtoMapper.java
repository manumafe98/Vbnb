package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.entity.Characteristic;

@Component
public class CharacteristicDtoMapper {

    public CharacteristicDto toDto(Characteristic characteristic) {
        return new CharacteristicDto(
                characteristic.getName(),
                characteristic.getImageUrl());
    }
}
