package com.manumafe.vbnb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Category;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
}
