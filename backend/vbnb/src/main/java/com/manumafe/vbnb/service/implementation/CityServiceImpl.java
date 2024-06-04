package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CityRepository;
import com.manumafe.vbnb.service.CityService;

@Service
public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public City saveCity(City city) {
        return cityRepository.save(city);
    }

    @Override
    public void deleteCityById(Long id) throws ResourceNotFoundException {
        cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City with id: " + id + " not found"));

        cityRepository.deleteById(id);
    }

    @Override
    public City findCityById(Long id) throws ResourceNotFoundException {
        City city = cityRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("City with id: " + id + " not found"));
        
        return city;
    }

    @Override
    public List<City> findAllCities() {
        return cityRepository.findAll();
    }
}
