package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Listing;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

}
