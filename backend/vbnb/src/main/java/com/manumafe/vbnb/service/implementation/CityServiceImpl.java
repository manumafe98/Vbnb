package com.manumafe.vbnb.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.CityDto;
import com.manumafe.vbnb.dto.mapper.CityDtoMapper;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CityRepository;
import com.manumafe.vbnb.service.CityService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;
    private final CityDtoMapper cityDtoMapper;

    @Override
    public CityDto saveCity(CityDto cityDto) throws ResourceAlreadyExistentException {

        Optional<City> optionalCategory = cityRepository.findByName(cityDto.getName());

        if (optionalCategory.isPresent()) {
            throw new ResourceAlreadyExistentException("City with name: " + cityDto.getName() + " already exists");
        }

        City city = new City();

        city.setName(cityDto.getName());
        city.setCountry(cityDto.getCountry());

        cityRepository.save(city);

        return cityDtoMapper.toDto(city);
    }

    @Override
    public void deleteCity(Long id) throws ResourceNotFoundException {
        cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City with id: " + id + " not found"));

        cityRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public CityDto findCityById(Long id) throws ResourceNotFoundException {
        City city = cityRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("City with id: " + id + " not found"));

        return cityDtoMapper.toDto(city);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CityDto> findAllCities() {
        return cityRepository.findAll().stream().map(cityDtoMapper::toDto).toList();
    }

    @Override
    public CityDto updateCity(Long id, CityDto cityDto) throws ResourceNotFoundException {
        City city = cityRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("City with id: " + id + " not found"));

        city.setName(cityDto.getName());
        city.setCountry(cityDto.getCountry());

        cityRepository.save(city);

        return cityDtoMapper.toDto(city);
    }
}
