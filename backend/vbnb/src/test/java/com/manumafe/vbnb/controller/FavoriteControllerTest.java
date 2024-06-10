package com.manumafe.vbnb.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class FavoriteControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void setUp() {

        var user = User.builder()
                .name("Roberto")
                .lastName("Carlos")
                .email("roberto.carlos3@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .userRole(UserRole.USER)
                .build();

        userRepository.save(user);

        Listing listing = new Listing();
        listing.setTitle("House in Mar del Plata");
        listing.setDescription("Beautiful house near the beach");
        
        listingRepository.save(listing);
    }

    @Test
    @Order(1)
    public void testCreateFavorite() throws Exception {
        setUp();

        mockMvc.perform(post("/api/v1/favorite")
                .param("userId", "1")
                .param("listingId", "1"))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.id").exists());
    }

    @Test
    @Order(2)
    public void testGetFavoritesByUserId() throws Exception {
        mockMvc.perform(get("/api/v1/favorite/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                    status().isOk(),
                    content().string("[{\"id\":{\"userId\":1,\"listingId\":1}}]"));
    }

    @Test
    @Order(3)
    public void deleteFavoriteById() throws Exception {
        mockMvc.perform(delete("/api/v1/favorite")
                .param("userId", "1")
                .param("listingId", "1"))
                .andExpect(status().isNoContent());
    }
}
