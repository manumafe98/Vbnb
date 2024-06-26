package com.manumafe.vbnb.dto.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.FavoriteDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.dto.UserFavoriteDto;
import com.manumafe.vbnb.entity.Favorite;

@Component
public class FavoriteDtoMapper {
    
    @Autowired
    private ListingDtoMapper listingDtoMapper;

    public FavoriteDto toDto(Favorite favorite) {
        return new FavoriteDto(
                favorite.getId());
    }

    public UserFavoriteDto toUserFavoriteDto(Favorite favorite) {
        ListingResponseDto listing = listingDtoMapper.toResponseDto(favorite.getListing());

        return new UserFavoriteDto(
                favorite.getId(),
                listing);
    }
}
