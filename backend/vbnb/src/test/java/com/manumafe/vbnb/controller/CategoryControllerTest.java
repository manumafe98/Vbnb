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
import com.manumafe.vbnb.entity.Category;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CategoryControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    public void testCreateCategory() throws Exception {

        Category category = new Category();
        category.setName("Houses");
        category.setImageUrl("http://image.house.example");

        String categoryJson = new ObjectMapper().writeValueAsString(category);

        mockMvc.perform(post("/api/v1/category")
                .contentType(MediaType.APPLICATION_JSON)
                .content(categoryJson))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("$.id").exists(),
                    jsonPath("$.name").value("Houses"),
                    jsonPath("$.imageUrl").value("http://image.house.example"));
    }

    @Test
    @Order(2)
    public void testGetAllCategories() throws Exception {
        mockMvc.perform(get("/api/v1/category"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string("[{\"id\":1,\"name\":\"Houses\",\"imageUrl\":\"http://image.house.example\"}]"));
    }

    @Test
    @Order(3)
    public void deleteCategoryById() throws Exception {
        mockMvc.perform(delete("/api/v1/category/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @Order(4)
    public void testDeleteNonExistingCategory() throws Exception {
        mockMvc.perform(delete("/api/v1/category/1"))
                .andExpectAll(
                    status().isNotFound(),
                    jsonPath("$.message").value("Category with id: 1 not found"));
    }
}
