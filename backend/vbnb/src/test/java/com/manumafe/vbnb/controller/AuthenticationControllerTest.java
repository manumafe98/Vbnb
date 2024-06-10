package com.manumafe.vbnb.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.manumafe.vbnb.entity.AuthenticationRequest;
import com.manumafe.vbnb.entity.RegisterRequest;


@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthenticationControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    private String getRegisterRequest() throws JsonProcessingException {

        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("roberto.carlos3@gmail.com");
        registerRequest.setName("Roberto");
        registerRequest.setLastName("Carlos");
        registerRequest.setPassword("1234");

        return new ObjectMapper().writeValueAsString(registerRequest);
    }

    private String getAuthenticationRequest(String password, String email) throws JsonProcessingException {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest();
        authenticationRequest.setEmail(email);
        authenticationRequest.setPassword(password);

        return new ObjectMapper().writeValueAsString(authenticationRequest);
    }

    @Test
    @Order(1)
    public void testRegistration() throws Exception {
        String registerRequestJson = getRegisterRequest();

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerRequestJson))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.token").exists());
    }

    @Test
    @Order(2)
    public void testEmailAlreadyRegistered() throws Exception {
        String registerRequestJson = getRegisterRequest();

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerRequestJson))
                .andExpectAll(
                    status().isConflict(),
                    jsonPath("$.message").value("Email already registered"));
    }

    @Test
    @Order(3)
    public void testAuthentication() throws Exception {
        String authenticationRequestJson = getAuthenticationRequest("1234", "roberto.carlos3@gmail.com");

        mockMvc.perform(post("/api/v1/auth/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(authenticationRequestJson))
                .andExpectAll(
                    status().isOk(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.token").exists());
    }

    @Test
    @Order(4)
    public void testAuthenticationWithWrongPassword() throws Exception {
        String authenticationRequestJson = getAuthenticationRequest("12345", "roberto.carlos3@gmail.com");

        mockMvc.perform(post("/api/v1/auth/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(authenticationRequestJson))
                .andExpectAll(
                    status().isUnauthorized(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.message").value("Incorrect password"));
    }

    @Test
    @Order(5)
    public void testAuthenticateNotRegisteredUser() throws Exception {
        String authenticationRequestJson = getAuthenticationRequest("12345", "roberto.carlos@gmail.com");

        mockMvc.perform(post("/api/v1/auth/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(authenticationRequestJson))
                .andExpectAll(
                    status().isUnauthorized(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.message").value("User not found"));
    }
}
