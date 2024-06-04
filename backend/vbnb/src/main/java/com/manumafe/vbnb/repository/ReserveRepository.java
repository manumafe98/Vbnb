package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.entity.ReserveId;

public interface ReserveRepository extends JpaRepository<Reserve, ReserveId> {
    List<Reserve> findByUserId(Long userId);
}
