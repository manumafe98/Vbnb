package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.CityDto;
import com.manumafe.vbnb.dto.mapper.CityDtoMapper;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CityRepository;
import com.manumafe.vbnb.service.CityService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;
    private final CityDtoMapper cityDtoMapper;

    @Override
    public CityDto saveCity(CityDto cityDto) {
        City city = new City();

        city.setName(cityDto.name());
        city.setCountry(cityDto.country());

        cityRepository.save(city);

        return cityDtoMapper.toDto(city);
    }

    @Override
    public void deleteCity(Long id) throws ResourceNotFoundException {
        cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City with id: " + id + " not found"));

        cityRepository.deleteById(id);
    }

    @Override
    public CityDto findCityById(Long id) throws ResourceNotFoundException {
        City city = cityRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("City with id: " + id + " not found"));
        
        return cityDtoMapper.toDto(city);
    }

    @Override
    public List<CityDto> findAllCities() {
        return cityRepository.findAll().stream().map(cityDtoMapper::toDto).toList();
    }
}
