package com.manumafe.vbnb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manumafe.vbnb.dto.ReserveDto;
import com.manumafe.vbnb.service.ReserveService;

@RestController
@RequestMapping("/api/v1/reserve")
public class ReserveController {

    @Autowired
    private ReserveService reserveService;

    @PostMapping
    public ResponseEntity<ReserveDto> createReserve(
            @RequestParam("userId") Long userId,
            @RequestParam("listingId") Long listingId,
            @RequestBody ReserveDto reserveDto) {

        ReserveDto reserve = reserveService.saveReserve(userId, listingId, reserveDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(reserve);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteReserve(
            @RequestParam("userId") Long userId,
            @RequestParam("listingId") Long listingId) {

        reserveService.deleteReserve(userId, listingId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping
    public ResponseEntity<ReserveDto> updateReserve(
            @RequestParam("userId") Long userId,
            @RequestParam("listingId") Long listingId,
            @RequestBody ReserveDto reserveDto) {
        
        ReserveDto reserve = reserveService.updateReserve(userId, listingId, reserveDto);

        return ResponseEntity.status(HttpStatus.OK).body(reserve);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ReserveDto>> getUserReserves(@PathVariable Long userId) {
        List<ReserveDto> reserves = reserveService.findReservesByUserId(userId);

        return ResponseEntity.status(HttpStatus.OK).body(reserves);
    }
}
