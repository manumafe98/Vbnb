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
import com.manumafe.vbnb.dto.UserReserveDto;
import com.manumafe.vbnb.service.ReserveService;

@RestController
@RequestMapping("/api/v1/reserve")
public class ReserveController {

    @Autowired
    private ReserveService reserveService;

    @PostMapping
    public ResponseEntity<ReserveDto> createReserve(
            @RequestParam("userEmail") String userEmail,
            @RequestParam("listingId") Long listingId,
            @RequestBody ReserveDto reserveDto) {

        ReserveDto reserve = reserveService.saveReserve(userEmail, listingId, reserveDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(reserve);
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteReserve(
            @RequestParam("reserveId") Long reserveId) {

        reserveService.deleteReserve(reserveId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping
    public ResponseEntity<ReserveDto> updateReserve(
            @RequestParam("reserveId") Long reserveId,
            @RequestBody ReserveDto reserveDto) {

        ReserveDto reserve = reserveService.updateReserve(reserveId, reserveDto);

        return ResponseEntity.status(HttpStatus.OK).body(reserve);
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<ReserveDto>> getListingReserves(@PathVariable Long listingId) {
        List<ReserveDto> reserves = reserveService.findByListingId(listingId);

        return ResponseEntity.status(HttpStatus.OK).body(reserves);
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<UserReserveDto>> getUserReserves(@PathVariable String userEmail) {
        List<UserReserveDto> reserves = reserveService.findReservesByUserEmail(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(reserves);
    }

    @GetMapping("/current/{userEmail}")
    public ResponseEntity<List<UserReserveDto>> getUserCurrentReserves(@PathVariable String userEmail) {
        List<UserReserveDto> reserves = reserveService.findCurrentReservesByUserEmail(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(reserves);
    }
}
