package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.FavoriteDto;
import com.manumafe.vbnb.dto.mapper.FavoriteDtoMapper;
import com.manumafe.vbnb.entity.Favorite;
import com.manumafe.vbnb.entity.FavoriteId;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.FavoriteRepository;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.FavoriteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final FavoriteDtoMapper favoriteDtoMapper;

    @Override
    public FavoriteDto saveFavorite(Long userId, Long listingId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + "not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        FavoriteId favoriteId = new FavoriteId(userId, listingId);

        Favorite favorite = new Favorite();
        favorite.setId(favoriteId);
        favorite.setUser(user);
        favorite.setListing(listing);

        favoriteRepository.save(favorite);

        return favoriteDtoMapper.toDto(favorite);
    }

    @Override
    public void deleteFavorite(Long userId, Long listingId) throws ResourceNotFoundException {
        FavoriteId favoriteId = new FavoriteId(userId, listingId);
        favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite with id: " + favoriteId + " not found"));

        favoriteRepository.deleteById(favoriteId);
    }

    @Override
    public List<FavoriteDto> findFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + " not found"));

        return favoriteRepository.findByUser(user).stream().map(favoriteDtoMapper::toDto).toList();
    }
}
