package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.UserDto;

public interface UserService {
    
    UserDto updateUser(Long id, UserDto userDto);

    List<UserDto> findAllUsers();
}
