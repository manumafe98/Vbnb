package com.manumafe.vbnb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manumafe.vbnb.dto.CharacteristicDto;
import com.manumafe.vbnb.service.CharacteristicService;

@RestController
@RequestMapping("/api/v1/characteristic")
public class CharacteristicController {

    @Autowired
    private CharacteristicService characteristicService;

    @PostMapping
    public ResponseEntity<CharacteristicDto> createCharacteristic(@RequestBody CharacteristicDto characteristicDto) {
        CharacteristicDto characteristic = characteristicService.saveCharacteristic(characteristicDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(characteristic);
    }

    @GetMapping
    public ResponseEntity<List<CharacteristicDto>> getCharacteristics() {
        List<CharacteristicDto> characteristics = characteristicService.findAllCharacteristics();

        return ResponseEntity.status(HttpStatus.OK).body(characteristics);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CharacteristicDto> updateCharacteristic(@PathVariable Long id,
            @RequestBody CharacteristicDto characteristicDto) {
        CharacteristicDto characteristic = characteristicService.updateCharacteristic(id, characteristicDto);

        return ResponseEntity.status(HttpStatus.OK).body(characteristic);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacteristicById(@PathVariable Long id) {
        characteristicService.deleteCharacteristic(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
