package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.dto.mapper.CharacteristicDtoMapper;
import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CharacteristicRepository;
import com.manumafe.vbnb.service.CharacteristicService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CharacteristicServiceImpl implements CharacteristicService {

    private final CharacteristicRepository characteristicRepository;
    private final CharacteristicDtoMapper characteristicDtoMapper;

    @Override
    public CharacteristicDto saveCharacteristic(CharacteristicDto characteristicDto) {
        Characteristic characteristic = new Characteristic();

        characteristic.setName(characteristicDto.name());
        characteristic.setImageUrl(characteristicDto.imageUrl());

        characteristicRepository.save(characteristic);

        return characteristicDtoMapper.toDto(characteristic);
    }

    @Override
    public void deleteCharacteristic(Long id) throws ResourceNotFoundException {
        characteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic with id: " + id + " not found"));

        characteristicRepository.deleteById(id);
    }

    @Override
    @Transactional
    public CharacteristicDto updateCharacteristic(Long id, CharacteristicDto characteristicDto)
            throws ResourceNotFoundException {

        Characteristic characteristicToUpdate = characteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic with id: " + id + " not found"));

        characteristicToUpdate.setImageUrl(characteristicDto.imageUrl());
        characteristicToUpdate.setName(characteristicDto.name());

        characteristicRepository.save(characteristicToUpdate);

        return characteristicDtoMapper.toDto(characteristicToUpdate);
    }

    @Override
    public List<CharacteristicDto> findAllCharacteristics() {
        return characteristicRepository.findAll().stream().map(characteristicDtoMapper::toDto).toList();
    }
}
