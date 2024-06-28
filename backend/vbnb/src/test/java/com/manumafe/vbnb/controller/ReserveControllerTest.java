package com.manumafe.vbnb.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.manumafe.vbnb.dto.ReserveDto;
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
public class ReserveControllerTest {

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

    private String mapToJson(ReserveDto reserve) throws JsonProcessingException{
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        return mapper.writeValueAsString(reserve);
    }

    @Test
    @Order(1)
    public void testCreateReserve() throws Exception {
        createContext();

        LocalDate date = LocalDate.of(2024, 6, 8);

        ReserveDto reserve = new ReserveDto(date, date.plusDays(7));
        String reserveJson = mapToJson(reserve);

        mockMvc.perform(post("/api/v1/reserve")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reserveJson)
                .param("userEmail", "roberto.carlos3@gmail.com")
                .param("listingId", "1"))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("checkInDate").value("2024-06-08"),
                    jsonPath("checkOutDate").value("2024-06-15"));
    }

    @Test
    @Order(2)
    public void testUpdateReserve() throws Exception {
        LocalDate date = LocalDate.of(2024, 8, 1);
        ReserveDto reserve = new ReserveDto(date, date.plusDays(7));
        String reserveJson = mapToJson(reserve);

        mockMvc.perform(put("/api/v1/reserve")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reserveJson)
                .param("userEmail", "roberto.carlos3@gmail.com")
                .param("listingId", "1"))
                .andExpectAll(
                    status().isOk(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("checkInDate").value("2024-08-01"),
                    jsonPath("checkOutDate").value("2024-08-08"));
    }

    @Test
    @Order(3)
    public void testGetReservesByUser() throws Exception {
        mockMvc.perform(get("/api/v1/reserve/roberto.carlos3@gmail.com"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"checkInDate\":\"2024-08-01\",\"checkOutDate\":\"2024-08-08\",\"listing\":{\"id\":1,\"title\":\"Snow Cabin\",\"description\":\"Warm cabin near the mountains to enjoy hiking and snowboarding\",\"city\":{\"id\":1,\"name\":\"Ushuaia\",\"country\":\"Argentina\"},\"category\":{\"id\":1,\"name\":\"Cabins\",\"imageUrl\":\"http://image.cabin.example\"},\"images\":[],\"characteristics\":[{\"id\":1,\"name\":\"Chimney\",\"imageUrl\":\"http://image.chimney.example\"}]}}]"));
    }

    @Test
    @Order(4)
    public void testdeleteReserve() throws Exception {
        mockMvc.perform(delete("/api/v1/reserve")
                .param("userEmail", "roberto.carlos3@gmail.com")
                .param("listingId", "1"))
                .andExpect(status().isNoContent());
    }
}
