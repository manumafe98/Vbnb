package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.CityDto;
import com.manumafe.vbnb.entity.City;

@Component
public class CityDtoMapper {

    public CityDto toDto(City city) {
        return new CityDto(
                city.getId(),
                city.getName(),
                city.getCountry());
    }
}
