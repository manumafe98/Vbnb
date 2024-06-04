package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Favorite;
import com.manumafe.vbnb.entity.FavoriteId;

public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
    List<Favorite> findByUserId(Long userId);
}
