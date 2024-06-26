package com.manumafe.vbnb.controller;

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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manumafe.vbnb.entity.Characteristic;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CharacteristicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    public void testCreateCharacteristic() throws Exception {

        Characteristic characteristic = new Characteristic();
        characteristic.setName("Wifi");
        characteristic.setImageUrl("https://image.wifi.example");

        String characteristicJson = new ObjectMapper().writeValueAsString(characteristic);

        mockMvc.perform(post("/api/v1/characteristic")
                .contentType(MediaType.APPLICATION_JSON)
                .content(characteristicJson))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.id").exists(),
                    jsonPath("$.name").value("Wifi"),
                    jsonPath("$.imageUrl").value("https://image.wifi.example"));
    }

    @Test
    @Order(2)
    public void testEditCharacteristicById() throws Exception {
        Characteristic characteristic = new Characteristic();
        characteristic.setName("Wifi");
        characteristic.setImageUrl("https://image2.wifi.example");

        String characteristicJson = new ObjectMapper().writeValueAsString(characteristic);

        mockMvc.perform(put("/api/v1/characteristic/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(characteristicJson))
                .andExpectAll(
                    status().isOk(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.id").exists(),
                    jsonPath("$.name").value("Wifi"),
                    jsonPath("$.imageUrl").value("https://image2.wifi.example"));
    }

    @Test
    @Order(3)
    public void testGetAllCharacteristics() throws Exception {
        mockMvc.perform(get("/api/v1/characteristic/all"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string("[{\"id\":1,\"name\":\"Wifi\",\"imageUrl\":\"https://image2.wifi.example\"}]"));
    }

    @Test
    @Order(4)
    public void testCreateAExistentCharacteristic() throws Exception {

        Characteristic characteristic = new Characteristic();
        characteristic.setName("Wifi");
        characteristic.setImageUrl("https://image.wifi.example");

        String characteristicJson = new ObjectMapper().writeValueAsString(characteristic);

        mockMvc.perform(post("/api/v1/characteristic")
                .contentType(MediaType.APPLICATION_JSON)
                .content(characteristicJson))
                .andExpectAll(
                    status().isConflict(),
                    jsonPath("$.message").value("Characteristic with name: Wifi already exists"));
    }

    @Test
    @Order(5)
    public void testDeleteCharacteristicById() throws Exception {
        mockMvc.perform(delete("/api/v1/characteristic/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @Order(6)
    public void testDeleteNonExistingCharacteristic() throws Exception {
        mockMvc.perform(delete("/api/v1/characteristic/1"))
                .andExpectAll(
                    status().isNotFound(),
                    jsonPath("$.message").value("Characteristic with id: 1 not found"));
    }
}
