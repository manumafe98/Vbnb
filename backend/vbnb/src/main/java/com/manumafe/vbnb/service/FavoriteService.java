package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.FavoriteDto;
import com.manumafe.vbnb.dto.UserFavoriteDto;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface FavoriteService {
    
    FavoriteDto saveFavorite(String userEmail, Long listingId) throws ResourceNotFoundException, ResourceAlreadyExistentException;

    void deleteFavorite(String userEmail, Long listingId) throws ResourceNotFoundException;

    List<UserFavoriteDto> findFavoritesByUserEmail(String userEmail) throws ResourceNotFoundException;
}
