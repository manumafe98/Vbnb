package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
}
