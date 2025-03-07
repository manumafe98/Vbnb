package com.manumafe.vbnb.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.dto.mapper.CharacteristicDtoMapper;
import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CharacteristicRepository;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.service.CharacteristicService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CharacteristicServiceImpl implements CharacteristicService {

    private final CharacteristicRepository characteristicRepository;
    private final CharacteristicDtoMapper characteristicDtoMapper;
    private final ListingRepository listingRepository;

    @Override
    public CharacteristicDto saveCharacteristic(CharacteristicDto characteristicDto) throws ResourceAlreadyExistentException {
        Optional<Characteristic> optionalCategory = characteristicRepository.findByName(characteristicDto.getName());

        if (optionalCategory.isPresent()) {
            throw new ResourceAlreadyExistentException("Characteristic with name: " + characteristicDto.getName() + " already exists");
        }

        Characteristic characteristic = new Characteristic();

        characteristic.setName(characteristicDto.getName());
        characteristic.setImageUrl(characteristicDto.getImageUrl());

        characteristicRepository.save(characteristic);

        return characteristicDtoMapper.toDto(characteristic);
    }

    @Override
    public void deleteCharacteristic(Long id) throws ResourceNotFoundException {
        Characteristic characteristic = characteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic with id: " + id + " not found"));

        for (Listing listing : characteristic.getListings()) {
            listing.getCharacteristics().remove(characteristic);
            listingRepository.save(listing);
        }

        characteristicRepository.deleteById(id);
    }

    @Override
    public CharacteristicDto updateCharacteristic(Long id, CharacteristicDto characteristicDto)
            throws ResourceNotFoundException {

        Characteristic characteristicToUpdate = characteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic with id: " + id + " not found"));

        characteristicToUpdate.setImageUrl(characteristicDto.getImageUrl());
        characteristicToUpdate.setName(characteristicDto.getName());

        characteristicRepository.save(characteristicToUpdate);

        return characteristicDtoMapper.toDto(characteristicToUpdate);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CharacteristicDto> findAllCharacteristics() {
        return characteristicRepository.findAll().stream().map(characteristicDtoMapper::toDto).toList();
    }
}
