package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface CityService {
    
    City saveCity(City city);

    void deleteCityById(Long id) throws ResourceNotFoundException;

    City findCityById(Long id) throws ResourceNotFoundException;

    List<City> findAllCities();
}
