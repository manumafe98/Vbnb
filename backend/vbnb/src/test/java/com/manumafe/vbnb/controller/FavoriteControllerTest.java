package com.manumafe.vbnb.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Set;

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

import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.repository.CategoryRepository;
import com.manumafe.vbnb.repository.CharacteristicRepository;
import com.manumafe.vbnb.repository.CityRepository;
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

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CharacteristicRepository characteristicRepository;

    private Category createCategory(String name, String url) {
        Category category = new Category();
        category.setName(name);
        category.setImageUrl(url);

        return category;
    }

    private City createCity(String country, String name) {
        City city = new City();
        city.setCountry(country);
        city.setName(name);

        return city;
    }

    private Characteristic createCharacteristic(String name, String url) {
        Characteristic characteristic = new Characteristic();
        characteristic.setName(name);
        characteristic.setImageUrl(url);

        return characteristic;
    }

    private User createUser(String name, String lastName, String email, String password) {
        return User.builder()
                .name(name)
                .lastName(lastName)
                .email(email)
                .password(passwordEncoder.encode(password))
                .userRole(UserRole.USER)
                .build();
    }

    private void saveItemsToRepositories(Category category, City city, Characteristic characteristic) {
        cityRepository.save(city);
        categoryRepository.save(category);
        characteristicRepository.save(characteristic);
    }

    private void createContext() {
        Characteristic characteristic = createCharacteristic("Chimney", "http://image.chimney.example");
        Category category = createCategory("Cabins", "http://image.cabin.example");
        City city = createCity("Argentina", "Ushuaia");
        
        saveItemsToRepositories(category, city, characteristic);

        User user = createUser("Roberto", "Carlos", "roberto.carlos3@gmail.com", "1234");
        userRepository.save(user);

        Listing listing = new Listing();
        listing.setTitle("Snow Cabin");
        listing.setDescription("Warm cabin near the mountains to enjoy hiking and snowboarding");
        listing.setCategory(category);
        listing.setCity(city);
        listing.setCharacteristics(Set.of(characteristic));

        listingRepository.save(listing);
    }

    @Test
    @Order(1)
    public void testCreateFavorite() throws Exception {
        createContext();

        mockMvc.perform(post("/api/v1/favorite")
                .param("userEmail", "roberto.carlos3@gmail.com")
                .param("listingId", "1"))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.id").exists());
    }

    @Test
    @Order(2)
    public void testGetFavoritesByUser() throws Exception {
        mockMvc.perform(get("/api/v1/favorite/roberto.carlos3@gmail.com")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"id\":{\"userId\":1,\"listingId\":1},\"listing\":{\"id\":1,\"title\":\"Snow Cabin\",\"description\":\"Warm cabin near the mountains to enjoy hiking and snowboarding\",\"city\":{\"id\":1,\"name\":\"Ushuaia\",\"country\":\"Argentina\"},\"category\":{\"id\":1,\"name\":\"Cabins\",\"imageUrl\":\"http://image.cabin.example\"},\"images\":[],\"characteristics\":[{\"id\":1,\"name\":\"Chimney\",\"imageUrl\":\"http://image.chimney.example\"}]}}]"));
    }

    @Test
    @Order(3)
    public void deleteFavorite() throws Exception {
        mockMvc.perform(delete("/api/v1/favorite")
                .param("userEmail", "roberto.carlos3@gmail.com")
                .param("listingId", "1"))
                .andExpect(status().isNoContent());
    }
}
