package com.manumafe.vbnb.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void setUpUser() {
        var user = User.builder()
            .name("Lionel")
            .lastName("Messi")
            .email("lionel.messi10@gmail.com")
            .password(passwordEncoder.encode("1234"))
            .userRole(UserRole.USER)
            .build();
        
        userRepository.save(user);
    }

    @Test
    @Order(1)
    public void getAllUsers() throws Exception {
        setUpUser();

        mockMvc.perform(get("/api/v1/user/all"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string("[]"));
    }

    @Test
    @Order(2)
    public void updateUser() throws Exception {
        var user = User.builder()
            .name("Lionel")
            .lastName("Messi")
            .email("lionel.messi10@gmail.com")
            .password(passwordEncoder.encode("1234"))
            .userRole(UserRole.ADMIN)
            .build();
            
        String userJson = new ObjectMapper().writeValueAsString(user);

        mockMvc.perform(put("/api/v1/user/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpectAll(
                    status().isOk(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.userRole").value("ADMIN"));
    }
}
