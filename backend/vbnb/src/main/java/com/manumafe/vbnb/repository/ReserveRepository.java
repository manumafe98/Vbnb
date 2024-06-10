package com.manumafe.vbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.entity.ReserveId;
import com.manumafe.vbnb.entity.User;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface ReserveRepository extends JpaRepository<Reserve, ReserveId> {
    List<Reserve> findByUser(User user);
}
