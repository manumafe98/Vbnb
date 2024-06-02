package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
