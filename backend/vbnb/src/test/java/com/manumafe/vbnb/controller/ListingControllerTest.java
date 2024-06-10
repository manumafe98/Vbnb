package com.manumafe.vbnb.controller;

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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.manumafe.vbnb.dto.ImageDto;
import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.repository.CategoryRepository;
import com.manumafe.vbnb.repository.CharacteristicRepository;
import com.manumafe.vbnb.repository.CityRepository;

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

    private String getListingJson(
            String title,
            String description,
            Category category,
            City city,
            Characteristic characteristic) throws JsonProcessingException {

        ImageDto image = new ImageDto("http://image1");

        ListingCreateDto listing = new ListingCreateDto(
                title,
                description,
                city.getId(),
                category.getId(),
                Set.of(image),
                Set.of(characteristic.getId()));

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
        Characteristic characteristic = createCharacteristic("Wifi", "http://image.wifi.example");
        Category category = createCategory("Houses", "http://image.house.example");
        City city = createCity("Argentina", "Buenos Aires");

        saveItemsToRepositories(category, city, characteristic);

        String listingJson = getListingJson(
                "House in Mar del Plata",
                "Beautiful house with wifi",
                category,
                city,
                characteristic);

        mockMvc.perform(post("/api/v1/listing")
                .contentType(MediaType.APPLICATION_JSON)
                .content(listingJson))
                .andExpectAll(
                        status().isCreated(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.id").exists(),
                        jsonPath("$.title").value("House in Mar del Plata"),
                        jsonPath("$.description").value("Beautiful house with wifi"),
                        jsonPath("$.city.id").exists(),
                        jsonPath("$.city.name").value("Buenos Aires"),
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

        String listingJson = getListingJson(
                "Department in Cordoba",
                "Beautiful department in front of the beach with kitchen",
                category,
                city,
                characteristic);

        mockMvc.perform(put("/api/v1/listing/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(listingJson))
                .andExpectAll(
                        status().isOk(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.id").exists(),
                        jsonPath("$.title").value("Department in Cordoba"),
                        jsonPath("$.description").value("Beautiful department in front of the beach with kitchen"),
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
        mockMvc.perform(get("/api/v1/listing/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.id").exists(),
                        jsonPath("$.title").value("Department in Cordoba"));
    }

    @Test
    @Order(4)
    public void testGetAllListings() throws Exception {
        mockMvc.perform(get("/api/v1/listing"))
                .andDo(print())
                .andExpectAll(
                        status().isOk(),
                        content().string(
                                "[{\"id\":1,\"title\":\"Department in Cordoba\",\"description\":\"Beautiful department in front of the beach with kitchen\",\"city\":{\"id\":2,\"name\":\"Cordoba\",\"country\":\"Argentina\"},\"category\":{\"id\":2,\"name\":\"Departments\",\"imageUrl\":\"http://image.department.example\"},\"images\":[{\"id\":2,\"imageUrl\":\"http://image1\"}],\"characteristics\":[{\"id\":2,\"name\":\"Kitchen\",\"imageUrl\":\"http://image.kitchen.example\"}]}]"));
    }

    @Test
    @Order(5)
    public void testDeleteListingById() throws Exception {
        mockMvc.perform(delete("/api/v1/listing/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @Order(6)
    public void testGetNonExistentListingException() throws Exception {
        mockMvc.perform(get("/api/v1/listing/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                    status().isNotFound(),
                    jsonPath("$.message").value("Listing with id: 1 not found"));
    }
}
