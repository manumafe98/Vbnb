package com.manumafe.vbnb.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.entity.User;

@Repository
public interface ReserveRepository extends JpaRepository<Reserve, Long> {
    List<Reserve> findByUser(User user);

    List<Reserve> findByListing(Listing listing);

    @Query("SELECT r FROM Reserve r WHERE r.user = :user AND r.checkInDate > :currentDate")
    List<Reserve> findCurrentReserves(
            @Param("user") User user,
            @Param("currentDate") LocalDate currentDate);
}
