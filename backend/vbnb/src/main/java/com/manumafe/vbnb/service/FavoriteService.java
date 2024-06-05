package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.entity.Favorite;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface FavoriteService {
    
    Favorite saveFavorite(Long userId, Long listingId) throws ResourceNotFoundException;

    void deleteFavorite(Long userId, Long listingId) throws ResourceNotFoundException;

    List<Favorite> findFavoritesByUserId(Long userId) throws ResourceNotFoundException;
}
