package com.manumafe.vbnb.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.entity.Listing;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    Optional<Listing> findByTitle(String title);

    List<Listing> findByCategory(Category category);

    List<Listing> findByCity(City city);

    @Query("SELECT l FROM Listing l WHERE NOT EXISTS (" +
            "SELECT r FROM Reserve r WHERE r.listing = l AND " +
            "(r.checkInDate <= :checkOutDate AND r.checkOutDate >= :checkInDate))")
    List<Listing> findAvailableListings(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);

    @Query("SELECT l FROM Listing l WHERE l.category = :category AND l.city = :city")
    List<Listing> findListingByCategoryAndCity(
            @Param("category") Category category,
            @Param("city") City city);

    @Query("SELECT l FROM Listing l WHERE l.category = :category AND NOT EXISTS (" +
            "SELECT r FROM Reserve r WHERE r.listing = l AND " +
            "(r.checkInDate <= :checkOutDate AND r.checkOutDate >= :checkInDate))")
    List<Listing> findAvailableListingsByCategory(
            @Param("category") Category category,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);

    @Query("SELECT l FROM Listing l WHERE l.city = :city AND NOT EXISTS (" +
            "SELECT r FROM Reserve r WHERE r.listing = l AND " +
            "(r.checkInDate <= :checkOutDate AND r.checkOutDate >= :checkInDate))")
    List<Listing> findAvailableListingsByCity(
            @Param("city") City city,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);

    @Query("SELECT l FROM Listing l WHERE l.category = :category AND l.city = :city AND NOT EXISTS (" +
            "SELECT r FROM Reserve r WHERE r.listing = l AND " +
            "(r.checkInDate <= :checkOutDate AND r.checkOutDate >= :checkInDate))")
    List<Listing> findAvailableListingsByCategoryAndCity(
            @Param("category") Category category,
            @Param("city") City city,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);
}
