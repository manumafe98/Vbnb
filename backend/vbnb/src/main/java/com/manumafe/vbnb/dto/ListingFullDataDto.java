package com.manumafe.vbnb.dto;

import java.util.Set;
import java.util.List;

import com.manumafe.vbnb.entity.FavoriteId;
import com.manumafe.vbnb.entity.Image;
import com.manumafe.vbnb.entity.Reserve;

public record ListingFullDataDto(
        Long id,
        String title,
        String description,
        CityDto city,
        CategoryDto category,
        Set<Image> images,
        Set<CharacteristicDto> characteristics,
        List<Reserve> reserves,
        Set<FavoriteId> favoriteIds) {
}
