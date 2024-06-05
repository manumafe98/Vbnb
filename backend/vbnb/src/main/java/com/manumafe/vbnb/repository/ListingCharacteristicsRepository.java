package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.ListingCharacteristic;
import com.manumafe.vbnb.entity.ListingCharacteristicsId;

public interface ListingCharacteristicsRepository extends JpaRepository<ListingCharacteristic, ListingCharacteristicsId> {
    List<ListingCharacteristic> findByListingId(Long id);
}
