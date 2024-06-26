package com.manumafe.vbnb.dto;

import java.util.Set;

import com.manumafe.vbnb.entity.FavoriteId;
import com.manumafe.vbnb.entity.Image;
import com.manumafe.vbnb.entity.ReserveId;

public record ListingFullDataDto(
        Long id,
        String title,
        String description,
        CityDto city,
        CategoryDto category,
        Set<Image> images,
        Set<CharacteristicDto> characteristics,
        Set<ReserveId> reserveIds,
        Set<FavoriteId> favoriteIds) {
}
