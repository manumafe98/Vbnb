package com.manumafe.vbnb.controller;

import java.util.List;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Rating;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.RatingRepository;
import com.manumafe.vbnb.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RatingControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String setUp() throws JsonProcessingException{
        
        var user1 = User.builder()
                .name("Roberto")
                .lastName("Carlos")
                .email("roberto.carlos3@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .userRole(UserRole.USER)
                .build();

        var user2 = User.builder()
                .name("Lionel")
                .lastName("Messi")
                .email("lionel.messi10@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .userRole(UserRole.USER)
                .build();
                
        var user3 = User.builder()
                .name("Cristiano")
                .lastName("Ronaldo")
                .email("cr7@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .userRole(UserRole.USER)
                .build();
        
        List<User> users = List.of(user1, user2, user3); 

        userRepository.saveAll(users);

        Listing listing = new Listing();
        listing.setTitle("House in Mar del Plata");
        listing.setDescription("Beautiful house near the beach");
        
        listingRepository.save(listing);

        Rating rating1 = new Rating();
        rating1.setListing(listing);
        rating1.setUser(user1);
        rating1.setRating(5.0);

        Rating rating2 = new Rating();
        rating2.setListing(listing);
        rating2.setUser(user2);
        rating2.setRating(4.5);

        List<Rating> ratings = List.of(rating1, rating2);

        ratingRepository.saveAll(ratings);

        Rating rating3 = new Rating();
        rating3.setRating(4.0);

        return new ObjectMapper().writeValueAsString(rating3);
    }

    @Test
    @Order(1)
    public void createRating() throws Exception {
        String ratingJson = setUp();

        mockMvc.perform(post("/api/v1/rating")
                .param("userId", "3")
                .param("listingId", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ratingJson))
                .andExpectAll(
                    status().isOk(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.rating").value("4.0"));
    }

    @Test
    @Order(2)
    public void getListingAverageRating() throws Exception {
        mockMvc.perform(get("/api/v1/rating/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpectAll(
                    status().isOk(),
                    jsonPath("$.rating").value("4.5"));
    }
}
