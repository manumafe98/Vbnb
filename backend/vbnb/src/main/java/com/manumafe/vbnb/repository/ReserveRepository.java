package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Reserve;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {
    
}
