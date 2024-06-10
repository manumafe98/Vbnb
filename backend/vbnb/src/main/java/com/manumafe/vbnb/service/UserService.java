package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.UserDto;
import com.manumafe.vbnb.entity.UserRole;

public interface UserService {
    
    UserDto updateUserRole(Long userId, UserRole role);

    List<UserDto> findAllUsers();

    UserDto getUser();
}
