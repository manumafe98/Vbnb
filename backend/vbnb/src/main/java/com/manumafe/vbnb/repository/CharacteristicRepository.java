package com.manumafe.vbnb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Characteristic;

@Repository
public interface CharacteristicRepository extends JpaRepository<Characteristic, Long> {
    Optional<Characteristic> findByName(String name);
}
