package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface CharacteristicService {

    Characteristic saveCharacteristic(Characteristic characteristic);

    void deleteCharacteristic(Long id) throws ResourceNotFoundException;

    Characteristic updateCharacteristic(Long id, Characteristic characteristic) throws ResourceNotFoundException;

    List<Characteristic> findAllCharacteristics();
}
