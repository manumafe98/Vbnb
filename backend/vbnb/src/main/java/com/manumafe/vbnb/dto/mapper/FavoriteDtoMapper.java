package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.FavoriteDto;
import com.manumafe.vbnb.entity.Favorite;

@Component
public class FavoriteDtoMapper {
    
    public FavoriteDto toDto(Favorite favorite) {
        return new FavoriteDto(favorite.getId());
    }
}
