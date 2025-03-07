package com.manumafe.vbnb.configuration;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @PostConstruct
    public void init() {
        Optional<User> adminUser = userRepository.findByEmail(adminEmail);

        if (!adminUser.isPresent()) {
            var admin = User.builder()
                .name("Admin")
                .lastName("Admin")
                .email(adminEmail)
                .password(passwordEncoder.encode(adminPassword))
                .userRole(UserRole.ADMIN)
                .build();

        userRepository.save(admin);
        }
    }
}
