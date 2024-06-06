package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.CityDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface CityService {
    
    CityDto saveCity(CityDto cityDto);

    void deleteCity(Long id) throws ResourceNotFoundException;

    CityDto findCityById(Long id) throws ResourceNotFoundException;

    List<CityDto> findAllCities();
}
