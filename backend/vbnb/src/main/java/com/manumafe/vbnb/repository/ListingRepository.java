package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.entity.Listing;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findByCategory(Category category);
    List<Listing> findByCity(City city);
}
