package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.FavoriteDto;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface FavoriteService {
    
    FavoriteDto saveFavorite(Long userId, Long listingId) throws ResourceNotFoundException;

    void deleteFavorite(Long userId, Long listingId) throws ResourceNotFoundException;

    List<FavoriteDto> findFavoritesByUserId(Long userId) throws ResourceNotFoundException;
}
