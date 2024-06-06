package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.manumafe.vbnb.entity.Image;

import jakarta.transaction.Transactional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByListingId(Long listingId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Image i WHERE i.listingId = :listingId")
    void deleteAllByListingId(Long listingId);
}
