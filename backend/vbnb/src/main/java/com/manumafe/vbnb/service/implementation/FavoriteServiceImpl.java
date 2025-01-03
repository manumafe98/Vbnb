package com.manumafe.vbnb.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.FavoriteDto;
import com.manumafe.vbnb.dto.UserFavoriteDto;
import com.manumafe.vbnb.dto.mapper.FavoriteDtoMapper;
import com.manumafe.vbnb.entity.Favorite;
import com.manumafe.vbnb.entity.FavoriteId;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.FavoriteRepository;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.FavoriteService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final FavoriteDtoMapper favoriteDtoMapper;

    @Override
    public FavoriteDto saveFavorite(String userEmail, Long listingId) throws ResourceNotFoundException, ResourceAlreadyExistentException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + "not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + listingId + " not found"));

        FavoriteId favoriteId = new FavoriteId(user.getId(), listingId);

        Optional<Favorite> optionalFavorite = favoriteRepository.findById(favoriteId);

        if (optionalFavorite.isPresent()) {
            throw new ResourceAlreadyExistentException("Favorite with id: " + favoriteId + " already exists");
        }

        Favorite favorite = new Favorite();
        favorite.setId(favoriteId);
        favorite.setUser(user);
        favorite.setListing(listing);

        user.getFavorites().add(favorite);
        listing.getFavorites().add(favorite);

        listingRepository.save(listing);
        userRepository.save(user);
        favoriteRepository.save(favorite);

        return favoriteDtoMapper.toDto(favorite);
    }

    @Override
    public void deleteFavorite(String userEmail, Long listingId) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + "not found"));

        FavoriteId favoriteId = new FavoriteId(user.getId(), listingId);
        Favorite favorite = favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite with id: " + favoriteId + " not found"));

        Listing listing = favorite.getListing();

        listing.getFavorites().remove(favorite);
        user.getFavorites().remove(favorite);

        listingRepository.save(listing);
        userRepository.save(user);
        favoriteRepository.deleteById(favoriteId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserFavoriteDto> findFavoritesByUserEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email: " + userEmail + "not found"));

        return favoriteRepository.findByUser(user).stream().map(favoriteDtoMapper::toUserFavoriteDto).toList();
    }
}
