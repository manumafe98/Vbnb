package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Image;
import com.manumafe.vbnb.entity.Listing;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByListing(Listing listing);

    @Modifying
    @Query("DELETE FROM Image i WHERE i.listing = :listing")
    void deleteAllByListing(Listing listing);
}
