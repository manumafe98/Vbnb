package com.manumafe.vbnb.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manumafe.vbnb.entity.City;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    public void testCreateCity() throws Exception {

        City city = new City();
        city.setName("Cordoba");
        city.setCountry("Argentina");

        String cityJson = new ObjectMapper().writeValueAsString(city);

        mockMvc.perform(post("/api/v1/city")
                .contentType(MediaType.APPLICATION_JSON)
                .content(cityJson))
                .andExpectAll(
                        status().isCreated(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.id").exists(),
                        jsonPath("$.name").value("Cordoba"),
                        jsonPath("$.country").value("Argentina"));
    }

    @Test
    @Order(2)
    public void testGetCityById() throws Exception {

        mockMvc.perform(get("/api/v1/city/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpectAll(
                    status().isOk(),
                    jsonPath("$.id").exists(),
                    jsonPath("$.name").value("Cordoba"),
                    jsonPath("$.country").value("Argentina"));
    }
    
    @Test
    @Order(3)
    public void testGetAllCities() throws Exception {
        mockMvc.perform(get("/api/v1/city"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string("[{\"id\":1,\"name\":\"Cordoba\",\"country\":\"Argentina\"}]"));
    }

    @Test
    @Order(4)
    public void testCreateAExistingCity() throws Exception {

        City city = new City();
        city.setName("Cordoba");
        city.setCountry("Argentina");

        String cityJson = new ObjectMapper().writeValueAsString(city);

        mockMvc.perform(post("/api/v1/city")
                .contentType(MediaType.APPLICATION_JSON)
                .content(cityJson))
                .andExpectAll(
                        status().isConflict(),
                        jsonPath("$.message").value("City with name: Cordoba already exists"));
    }

    @Test
    @Order(5)
    public void deleteCityById() throws Exception {
        mockMvc.perform(delete("/api/v1/city/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @Order(6)
    public void testGetNonExistentCityException() throws Exception {
        mockMvc.perform(get("/api/v1/city/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                    status().isNotFound(),
                    jsonPath("$.message").value("City with id: 1 not found"));
    }
}
