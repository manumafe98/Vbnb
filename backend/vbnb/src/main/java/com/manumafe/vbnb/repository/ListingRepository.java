package com.manumafe.vbnb.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    @Query("SELECT l FROM Listing l WHERE NOT EXISTS (" +
           "SELECT r FROM Reserve r WHERE r.listing = l AND " +
           "(r.checkInDate < :checkOutDate AND r.checkOutDate > :checkInDate))")
    List<Listing> findAvailableListings(@Param("checkInDate") LocalDate checkInDate, @Param("checkOutDate") LocalDate checkOutDate);
    @Query("SELECT l FROM Listing l WHERE l.city = :city AND NOT EXISTS (" +
           "SELECT r FROM Reserve r WHERE r.listing = l AND " +
           "(r.checkInDate < :checkOutDate AND r.checkOutDate > :checkInDate))")
    List<Listing> findAvailableListingsByCity(@Param("city") City city,
                                              @Param("checkInDate") LocalDate checkInDate,
                                              @Param("checkOutDate") LocalDate checkOutDate);
}
