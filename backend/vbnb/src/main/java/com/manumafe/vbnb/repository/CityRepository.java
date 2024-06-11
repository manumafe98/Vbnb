package com.manumafe.vbnb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.City;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findByName(String name);
}
