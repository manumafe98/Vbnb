package com.manumafe.vbnb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Rating;
import com.manumafe.vbnb.entity.User;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByUserAndListing(User user, Listing listing);

    List<Rating> findByListing(Listing listing);
}
