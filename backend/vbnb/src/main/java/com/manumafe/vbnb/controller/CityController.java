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

import com.manumafe.vbnb.dto.CityDto;
import com.manumafe.vbnb.service.CityService;

@RestController
@RequestMapping("/api/v1/city")
public class CityController {
    
    @Autowired
    private CityService cityService;

    @PostMapping
    public ResponseEntity<CityDto> createCity(@RequestBody CityDto cityDto) {
        CityDto city = cityService.saveCity(cityDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(city);
    }

    @GetMapping
    public ResponseEntity<List<CityDto>> getCities() {
        List<CityDto> cities = cityService.findAllCities();

        return ResponseEntity.status(HttpStatus.OK).body(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityDto> getCityById(@PathVariable Long id) {
        CityDto city = cityService.findCityById(id);

        return ResponseEntity.status(HttpStatus.OK).body(city);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CityDto> updateCityByID(@PathVariable Long id, @RequestBody CityDto cityDto) {
        CityDto city = cityService.updateCity(id, cityDto);

        return ResponseEntity.status(HttpStatus.OK).body(city);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCityById(@PathVariable Long id) {

        cityService.deleteCity(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
