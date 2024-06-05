package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CharacteristicRepository;
import com.manumafe.vbnb.service.CharacteristicService;

@Service
public class CharacteristicServiceImpl implements CharacteristicService {

    @Autowired
    private CharacteristicRepository characteristicRepository;

    @Override
    public Characteristic saveCharacteristic(Characteristic characteristic) {
        return characteristicRepository.save(characteristic);
    }

    @Override
    public void deleteCharacteristic(Long id) throws ResourceNotFoundException {
        characteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic with id: " + id + " not found"));

        characteristicRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Characteristic updateCharacteristic(Long id, Characteristic characteristic)
            throws ResourceNotFoundException {
        
        Characteristic characteristicToUpdate = characteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic with id: " + id + " not found"));

        characteristicToUpdate.setImageUrl(characteristic.getImageUrl());
        characteristicToUpdate.setName(characteristic.getName());
        characteristicToUpdate.setListings(characteristic.getListings());

        return characteristicRepository.save(characteristicToUpdate);
    }

    @Override
    public List<Characteristic> findAllCharacteristics() {
        return characteristicRepository.findAll();
    }
}
