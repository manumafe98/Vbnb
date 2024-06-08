package com.manumafe.vbnb.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    
    private String name;
    private String lastName;
    private String email;
    private String password;
}
