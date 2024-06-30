package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.UserDto;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface UserService {
    
    UserDto updateUserRole(Long userId, UserRole role) throws ResourceNotFoundException;

    List<UserDto> findAllUsers();

    void deleteUserById(long userId) throws ResourceNotFoundException;
}
