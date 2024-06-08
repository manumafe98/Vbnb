package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.UserDto;
import com.manumafe.vbnb.entity.User;

@Component
public class UserDtoMapper {
    
    public UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getLastName(),
                user.getEmail(),
                user.getUserRole());
    }
}
