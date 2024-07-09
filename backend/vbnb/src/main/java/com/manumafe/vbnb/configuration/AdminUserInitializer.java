package com.manumafe.vbnb.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Component
@Profile("!test")
public class AdminUserInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {

        var admin = User.builder()
                .name("Admin")
                .lastName("Admin")
                .email("admin@gmail.com")
                .password(passwordEncoder.encode("admin"))
                .userRole(UserRole.ADMIN)
                .build();

        userRepository.save(admin);
    }
}
