package com.manumafe.vbnb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByListingId(Long id);
}
