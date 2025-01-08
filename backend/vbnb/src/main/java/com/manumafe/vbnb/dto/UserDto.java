package com.manumafe.vbnb.dto;

import com.manumafe.vbnb.entity.UserRole;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private UserRole role;
}
