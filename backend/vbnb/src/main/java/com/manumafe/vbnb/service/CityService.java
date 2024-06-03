package com.manumafe.vbnb.service;

import java.util.List;
import java.util.Optional;

import com.manumafe.vbnb.entity.City;

public interface CityService {
    
    City saveCity(City city);

    City updateCityById(Long id);

    void deleteCityById(City city, Long id);

    Optional<City> findCityById(Long id);

    List<City> findAllCities();
}
