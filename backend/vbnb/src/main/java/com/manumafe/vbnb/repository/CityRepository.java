package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.City;

public interface CityRepository extends JpaRepository<City, Long> {
    
}
