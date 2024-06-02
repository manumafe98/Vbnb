package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Characteristic;

public interface CharacteristicRepository extends JpaRepository<Characteristic, Long> {
    
}
