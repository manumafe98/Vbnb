package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface CharacteristicService {

    CharacteristicDto saveCharacteristic(CharacteristicDto characteristicDto) throws ResourceAlreadyExistentException;

    void deleteCharacteristic(Long id) throws ResourceNotFoundException;

    CharacteristicDto updateCharacteristic(Long id, CharacteristicDto characteristicDto) throws ResourceNotFoundException;

    List<CharacteristicDto> findAllCharacteristics();
}
