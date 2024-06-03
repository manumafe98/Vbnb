package com.manumafe.vbnb.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CityRepository;
import com.manumafe.vbnb.service.CityService;

public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public City saveCity(City city) {
        return cityRepository.save(city);
    }

    @Override
    public City updateCityById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateCityById'");
    }

    @Override
    public void deleteCityById(City city, Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteCityById'");
    }

    @Override
    public Optional<City> findCityById(Long id) {
        Optional<City> cityOptional = cityRepository.findById(id);

        if (cityOptional.isPresent()) {
            return cityOptional;
        }

        throw new ResourceNotFoundException("City with ID: " + id + " not found");
    }

    @Override
    public List<City> findAllCities() {
        return cityRepository.findAll();
    }
}
