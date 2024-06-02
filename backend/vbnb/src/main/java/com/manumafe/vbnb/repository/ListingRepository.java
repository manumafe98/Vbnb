package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Listing;

public interface ListingRepository extends JpaRepository<Listing, Long> {

}
