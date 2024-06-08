package com.manumafe.vbnb.dto;

import com.manumafe.vbnb.entity.UserRole;

public record UserDto(
        Long id,
        String name,
        String lastName,
        String email,
        UserRole role) {
}
