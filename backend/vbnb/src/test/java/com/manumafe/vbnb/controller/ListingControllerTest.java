package com.manumafe.vbnb.controller;

import java.time.LocalDate;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
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
import com.manumafe.vbnb.dto.ListingCreateDto;
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
import com.manumafe.vbnb.service.ReserveService;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ListingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CharacteristicRepository characteristicRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ReserveService reserveService;

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
        listing.setOwnerPhoneNumber("+541167114273");
        listing.setCategory(category);
        listing.setCity(city);
        listing.setCharacteristics(Set.of(characteristic));

        listingRepository.save(listing);

        LocalDate date = LocalDate.of(2024, 07, 01);

        ReserveDto reserve = new ReserveDto(date, date.plusDays(7));

        reserveService.saveReserve(user.getEmail(), listing.getId(), reserve);
    }

    private ListingCreateDto createListingDto(
            String title,
            String description,
            String ownerPhoneNumber,
            Category category,
            City city,
            Characteristic characteristic) {

        return new ListingCreateDto(
                title,
                description,
                ownerPhoneNumber,
                city.getId(),
                category.getId(),
                Set.of("http://image1"),
                Set.of(characteristic.getId()));
    }

    private String getListingJson(ListingCreateDto listing) throws JsonProcessingException {

        return new ObjectMapper().writeValueAsString(listing);
    }

    private void saveItemsToRepositories(Category category, City city, Characteristic characteristic) {
        cityRepository.save(city);
        categoryRepository.save(category);
        characteristicRepository.save(characteristic);
    }

    @Test
    @Order(1)
    public void testCreateListing() throws Exception {
        createContext();

        Characteristic characteristic = createCharacteristic("Wifi", "http://image.wifi.example");
        Category category = createCategory("Houses", "http://image.house.example");
        City city = createCity("Argentina", "Mar del Plata");

        saveItemsToRepositories(category, city, characteristic);

        ListingCreateDto listing = createListingDto(
                "House in Mar del Plata",
                "Beautiful house with wifi",
                "+541167114273",
                category,
                city,
                characteristic);

        String listingJson = getListingJson(listing);

        mockMvc.perform(post("/api/v1/listing/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(listingJson))
                .andExpectAll(
                        status().isCreated(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.id").exists(),
                        jsonPath("$.title").value("House in Mar del Plata"),
                        jsonPath("$.description").value("Beautiful house with wifi"),
                        jsonPath("$.ownerPhoneNumber").value("+541167114273"),
                        jsonPath("$.city.id").exists(),
                        jsonPath("$.city.name").value("Mar del Plata"),
                        jsonPath("$.city.country").value("Argentina"),
                        jsonPath("$.category.id").exists(),
                        jsonPath("$.category.name").value("Houses"),
                        jsonPath("$.category.imageUrl").value("http://image.house.example"),
                        jsonPath("$.images[0].id").exists(),
                        jsonPath("$.images[0].imageUrl").value("http://image1"),
                        jsonPath("$.characteristics[0].id").exists(),
                        jsonPath("$.characteristics[0].name").value("Wifi"),
                        jsonPath("$.characteristics[0].imageUrl").value("http://image.wifi.example"));
    }

    @Test
    @Order(2)
    public void testEditListingById() throws Exception {
        Characteristic characteristic = createCharacteristic("Kitchen", "http://image.kitchen.example");
        Category category = createCategory("Departments", "http://image.department.example");
        City city = createCity("Argentina", "Cordoba");

        saveItemsToRepositories(category, city, characteristic);

        ListingCreateDto listing = createListingDto(
                "Department in Cordoba",
                "Beautiful department in front of the beach with kitchen",
                "+541167114273",
                category,
                city,
                characteristic);

        String listingJson = getListingJson(listing);

        mockMvc.perform(put("/api/v1/listing/update/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(listingJson))
                .andExpectAll(
                        status().isOk(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.id").exists(),
                        jsonPath("$.title").value("Department in Cordoba"),
                        jsonPath("$.description").value("Beautiful department in front of the beach with kitchen"),
                        jsonPath("$.ownerPhoneNumber").value("+541167114273"),
                        jsonPath("$.city.id").exists(),
                        jsonPath("$.city.name").value("Cordoba"),
                        jsonPath("$.city.country").value("Argentina"),
                        jsonPath("$.category.id").exists(),
                        jsonPath("$.category.name").value("Departments"),
                        jsonPath("$.category.imageUrl").value("http://image.department.example"),
                        jsonPath("$.images[0].id").exists(),
                        jsonPath("$.images[0].imageUrl").value("http://image1"),
                        jsonPath("$.characteristics[0].id").exists(),
                        jsonPath("$.characteristics[0].name").value("Kitchen"),
                        jsonPath("$.characteristics[0].imageUrl").value("http://image.kitchen.example"));
    }

    @Test
    @Order(3)
    public void testGetListingById() throws Exception {
        mockMvc.perform(get("/api/v1/listing/get/2")
                .accept(MediaType.APPLICATION_JSON))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.id").exists(),
                        jsonPath("$.title").value("Department in Cordoba"));
    }

    @Test
    @Order(4)
    public void testGetAllAvailableListings() throws Exception {

        mockMvc.perform(get("/api/v1/listing/available")
                .param("checkInDate", "2024-07-01")
                .param("checkOutDate", "2024-07-08"))
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"id\":2,\"title\":\"Department in Cordoba\",\"description\":\"Beautiful department in front of the beach with kitchen\",\"ownerPhoneNumber\":\"+541167114273\",\"city\":{\"id\":3,\"name\":\"Cordoba\",\"country\":\"Argentina\"},\"category\":{\"id\":3,\"name\":\"Departments\",\"imageUrl\":\"http://image.department.example\"},\"images\":[{\"id\":2,\"imageUrl\":\"http://image1\"}],\"characteristics\":[{\"id\":3,\"name\":\"Kitchen\",\"imageUrl\":\"http://image.kitchen.example\"}]}]"));
    }

    @Test
    @Order(5)
    public void testGetAllListingsByCityNameAndCategoryName() throws Exception {
        mockMvc.perform(get("/api/v1/listing/by-city-category")
                .param("cityName", "Ushuaia")
                .param("categoryName", "Departments"))
                .andExpectAll(
                    status().isOk(),
                    content().string("[]"));
    }

    @Test
    @Order(6)
    public void testGetAllAvailableListingsByCityName() throws Exception {
        mockMvc.perform(get("/api/v1/listing/available/by-city")
                .param("cityName", "Ushuaia")
                .param("checkInDate", "2024-07-01")
                .param("checkOutDate", "2024-07-08"))
                .andExpectAll(
                    status().isOk(),
                    content().string("[]"));
    }

    @Test
    @Order(7)
    public void testGetAllAvailableListingsByCategoryName() throws Exception {
        mockMvc.perform(get("/api/v1/listing/available/by-category")
                .param("categoryName", "Departments")
                .param("checkInDate", "2024-07-01")
                .param("checkOutDate", "2024-07-08"))
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"id\":2,\"title\":\"Department in Cordoba\",\"description\":\"Beautiful department in front of the beach with kitchen\",\"ownerPhoneNumber\":\"+541167114273\",\"city\":{\"id\":3,\"name\":\"Cordoba\",\"country\":\"Argentina\"},\"category\":{\"id\":3,\"name\":\"Departments\",\"imageUrl\":\"http://image.department.example\"},\"images\":[{\"id\":2,\"imageUrl\":\"http://image1\"}],\"characteristics\":[{\"id\":3,\"name\":\"Kitchen\",\"imageUrl\":\"http://image.kitchen.example\"}]}]"));
    }

    @Test
    @Order(8)
    public void testGetAllAvailableListingsByCategoryNameAndCityName() throws Exception {
        mockMvc.perform(get("/api/v1/listing/available/by-category-city")
                .param("categoryName", "Cabins")
                .param("cityName", "Ushuaia")
                .param("checkInDate", "2024-07-09")
                .param("checkOutDate", "2024-07-15"))
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"id\":1,\"title\":\"Snow Cabin\",\"description\":\"Warm cabin near the mountains to enjoy hiking and snowboarding\",\"ownerPhoneNumber\":\"+541167114273\",\"city\":{\"id\":1,\"name\":\"Ushuaia\",\"country\":\"Argentina\"},\"category\":{\"id\":1,\"name\":\"Cabins\",\"imageUrl\":\"http://image.cabin.example\"},\"images\":[],\"characteristics\":[{\"id\":1,\"name\":\"Chimney\",\"imageUrl\":\"http://image.chimney.example\"}]}]"));
    }

    @Test
    @Order(9)
    public void testGetAllListings() throws Exception {
        mockMvc.perform(get("/api/v1/listing/all"))
                .andDo(print())
                .andExpectAll(
                        status().isOk(),
                        content().string(
                                "[{\"id\":1,\"title\":\"Snow Cabin\",\"description\":\"Warm cabin near the mountains to enjoy hiking and snowboarding\",\"ownerPhoneNumber\":\"+541167114273\",\"city\":{\"id\":1,\"name\":\"Ushuaia\",\"country\":\"Argentina\"},\"category\":{\"id\":1,\"name\":\"Cabins\",\"imageUrl\":\"http://image.cabin.example\"},\"images\":[],\"characteristics\":[{\"id\":1,\"name\":\"Chimney\",\"imageUrl\":\"http://image.chimney.example\"}]}," +
                                "{\"id\":2,\"title\":\"Department in Cordoba\",\"description\":\"Beautiful department in front of the beach with kitchen\",\"ownerPhoneNumber\":\"+541167114273\",\"city\":{\"id\":3,\"name\":\"Cordoba\",\"country\":\"Argentina\"},\"category\":{\"id\":3,\"name\":\"Departments\",\"imageUrl\":\"http://image.department.example\"},\"images\":[{\"id\":2,\"imageUrl\":\"http://image1\"}],\"characteristics\":[{\"id\":3,\"name\":\"Kitchen\",\"imageUrl\":\"http://image.kitchen.example\"}]}]"));
    }

    @Test
    @Order(10)
    public void testGetListingByCityName() throws Exception {
        mockMvc.perform(get("/api/v1/listing/city/Ushuaia"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"id\":1,\"title\":\"Snow Cabin\",\"description\":\"Warm cabin near the mountains to enjoy hiking and snowboarding\",\"ownerPhoneNumber\":\"+541167114273\",\"city\":{\"id\":1,\"name\":\"Ushuaia\",\"country\":\"Argentina\"},\"category\":{\"id\":1,\"name\":\"Cabins\",\"imageUrl\":\"http://image.cabin.example\"},\"images\":[],\"characteristics\":[{\"id\":1,\"name\":\"Chimney\",\"imageUrl\":\"http://image.chimney.example\"}]}]"));
    }

    @Test
    @Order(11)
    public void testGetListingByCategoryName() throws Exception {
        mockMvc.perform(get("/api/v1/listing/category/Departments"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string(
                        "[{\"id\":2,\"title\":\"Department in Cordoba\",\"description\":\"Beautiful department in front of the beach with kitchen\",\"ownerPhoneNumber\":\"+541167114273\",\"city\":{\"id\":3,\"name\":\"Cordoba\",\"country\":\"Argentina\"},\"category\":{\"id\":3,\"name\":\"Departments\",\"imageUrl\":\"http://image.department.example\"},\"images\":[{\"id\":2,\"imageUrl\":\"http://image1\"}],\"characteristics\":[{\"id\":3,\"name\":\"Kitchen\",\"imageUrl\":\"http://image.kitchen.example\"}]}]"));
    }

    @Test
    @Order(12)
    public void testDeleteListingById() throws Exception {
        mockMvc.perform(delete("/api/v1/listing/delete/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @Order(13)
    public void testGetNonExistentListingException() throws Exception {
        mockMvc.perform(get("/api/v1/listing/get/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                        status().isNotFound(),
                        jsonPath("$.message").value("Listing with id: 1 not found"));
    }
}
