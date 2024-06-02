package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
    
}
