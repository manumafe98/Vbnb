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
import java.util.List;

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
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.ReserveService;

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
    private ReserveService reserveService;

    private void setUp() {

        var user = User.builder()
                .name("Roberto")
                .lastName("Carlos")
                .email("roberto.carlos3@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .userRole(UserRole.USER)
                .build();

        userRepository.save(user);

        Listing listing1 = new Listing();
        listing1.setTitle("House in Mar del Plata");
        listing1.setDescription("Beautiful house near the beach");

        Listing listing2 = new Listing();
        listing2.setTitle("Department in Cordoba");
        listing2.setDescription("Beautiful deparment near the mountains");

        List<Listing> listings = List.of(listing1, listing2);

        listingRepository.saveAll(listings);

        LocalDate date = LocalDate.of(2024, 07, 01);

        ReserveDto reserve = new ReserveDto(date, date.plusDays(7));

        reserveService.saveReserve(user.getId(), listing1.getId(), reserve);
    }

    private String mapToJson(ReserveDto reserve) throws JsonProcessingException{
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        return mapper.writeValueAsString(reserve);
    }


    @Test
    @Order(1)
    public void testCreateReserve() throws Exception {
        setUp();

        LocalDate date = LocalDate.of(2024, 6, 8);

        ReserveDto reserve = new ReserveDto(date, date.plusDays(7));
        String reserveJson = mapToJson(reserve);

        mockMvc.perform(post("/api/v1/reserve")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reserveJson)
                .param("userId", "1")
                .param("listingId", "2"))
                .andExpectAll(
                    status().isCreated(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("checkInDate").value("2024-06-08"),
                    jsonPath("checkOutDate").value("2024-06-15"));
    }

    @Test
    @Order(2)
    public void updateReserve() throws Exception {
        LocalDate date = LocalDate.of(2024, 8, 1);
        ReserveDto reserve = new ReserveDto(date, date.plusDays(7));
        String reserveJson = mapToJson(reserve);

        mockMvc.perform(put("/api/v1/reserve")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reserveJson)
                .param("userId", "1")
                .param("listingId", "1"))
                .andExpectAll(
                    status().isOk(),
                    content().contentType(MediaType.APPLICATION_JSON),
                    jsonPath("checkInDate").value("2024-08-01"),
                    jsonPath("checkOutDate").value("2024-08-08"));
    }

    @Test
    @Order(3)
    public void getReservesByUser() throws Exception {
        mockMvc.perform(get("/api/v1/reserve/1"))
                .andDo(print())
                .andExpectAll(
                    status().isOk(),
                    content().string("[{\"checkInDate\":\"2024-06-08\",\"checkOutDate\":\"2024-06-15\"},{\"checkInDate\":\"2024-08-01\",\"checkOutDate\":\"2024-08-08\"}]"));
    }

    @Test
    @Order(4)
    public void deleteReserve() throws Exception {
        mockMvc.perform(delete("/api/v1/reserve")
                .param("userId", "1")
                .param("listingId", "1"))
                .andExpect(status().isNoContent());
    }
}
