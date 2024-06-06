package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.manumafe.vbnb.entity.ListingCharacteristic;
import com.manumafe.vbnb.entity.ListingCharacteristicId;

import jakarta.transaction.Transactional;

public interface ListingCharacteristicRepository extends JpaRepository<ListingCharacteristic, ListingCharacteristicId> {
    List<ListingCharacteristic> findByListingId(Long ListingId);

    @Modifying
    @Transactional
    @Query("DELETE FROM ListingCharacteristic l WHERE l.listingId = :listingId")
    void deleteAllByListingId(Long listingId);
}
