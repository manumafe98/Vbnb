package com.manumafe.vbnb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manumafe.vbnb.dto.FavoriteDto;
import com.manumafe.vbnb.dto.UserFavoriteDto;
import com.manumafe.vbnb.service.FavoriteService;

@RestController
@RequestMapping("/api/v1/favorite")
public class FavoriteController {
    
    @Autowired
    private FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<FavoriteDto> createFavorite(
            @RequestParam("userEmail") String userEmail,
            @RequestParam("listingId") Long listingId) {
            
        FavoriteDto favorite = favoriteService.saveFavorite(userEmail, listingId);

        return ResponseEntity.status(HttpStatus.CREATED).body(favorite);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFavorite(
            @RequestParam("userEmail") String userEmail,
            @RequestParam("listingId") Long listingId) {
            
        favoriteService.deleteFavorite(userEmail, listingId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{userEmail}")
    public ResponseEntity<List<UserFavoriteDto>> getUserFavorites(@PathVariable String userEmail) {
        List<UserFavoriteDto> favorites = favoriteService.findFavoritesByUserEmail(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(favorites);
    }
}
