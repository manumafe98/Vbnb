package com.manumafe.vbnb.controller;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.manumafe.vbnb.dto.RatingDto;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.Rating;
import com.manumafe.vbnb.entity.RatingId;
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

    private void setUp(){

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
        listing.setOwnerPhoneNumber("+541167114273");

        listingRepository.save(listing);

        RatingId ratingId1 = new RatingId(user1.getId(), listing.getId());
        RatingId ratingId2 = new RatingId(user2.getId(), listing.getId());

        Rating rating1 = new Rating();
        rating1.setId(ratingId1);
        rating1.setListing(listing);
        rating1.setUser(user1);
        rating1.setRating(5.0);
        rating1.setComment("Amazing Place!");

        Rating rating2 = new Rating();
        rating2.setId(ratingId2);
        rating2.setListing(listing);
        rating2.setUser(user2);
        rating2.setRating(4.5);
        rating2.setComment("Pretty comfortable and spaceful");

        List<Rating> ratings = List.of(rating1, rating2);

        ratingRepository.saveAll(ratings);
    }

    private String getRatingJson(RatingDto rating) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(rating);
    }

    @Test
    @Order(1)
    public void testCreateRating() throws Exception {
        setUp();

        RatingDto rating = new RatingDto(4.0, "Nice house near to the beach");

        String ratingJson = getRatingJson(rating);

        mockMvc.perform(post("/api/v1/rating")
                .param("userEmail", "cr7@gmail.com")
                .param("listingId", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ratingJson))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.rating").value("4.0"),
                    jsonPath("$.comment").value("Nice house near to the beach"));
    }

    @Test
    @Order(2)
    public void testGetListingRatingInformation() throws Exception {
        mockMvc.perform(get("/api/v1/rating/info/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpectAll(
                    status().isOk(),
                    jsonPath("$.rating").value("4.5"),
                    jsonPath("$.timesRated").value("3"));
    }

    @Test
    @Order(3)
    public void testUpdateRating() throws Exception {
        RatingDto rating = new RatingDto(3.2, "Was ok, not 100% what expected");
        String ratingJson = getRatingJson(rating);

        mockMvc.perform(put("/api/v1/rating")
                .param("userEmail", "cr7@gmail.com")
                .param("listingId", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ratingJson))
                .andExpectAll(
                    status().isOk(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.rating").value("3.2"),
                    jsonPath("$.comment").value("Was ok, not 100% what expected"));
    }

    @Test
    @Order(4)
    public void testGetRatingsByListingId() throws Exception {
        mockMvc.perform(get("/api/v1/rating/get/1"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"rating\":5.0,\"comment\":\"Amazing Place!\",\"user\":{\"id\":1,\"name\":\"Roberto\",\"lastName\":\"Carlos\",\"email\":\"roberto.carlos3@gmail.com\",\"role\":\"USER\"}},{\"rating\":4.5,\"comment\":\"Pretty comfortable and spaceful\",\"user\":{\"id\":2,\"name\":\"Lionel\",\"lastName\":\"Messi\",\"email\":\"lionel.messi10@gmail.com\",\"role\":\"USER\"}},{\"rating\":3.2,\"comment\":\"Was ok, not 100% what expected\",\"user\":{\"id\":3,\"name\":\"Cristiano\",\"lastName\":\"Ronaldo\",\"email\":\"cr7@gmail.com\",\"role\":\"USER\"}}]"));
    }
}
