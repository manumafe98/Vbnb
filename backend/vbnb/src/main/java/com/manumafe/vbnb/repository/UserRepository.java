package com.manumafe.vbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manumafe.vbnb.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
