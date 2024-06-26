package com.manumafe.vbnb.dto;

import com.manumafe.vbnb.entity.FavoriteId;

public record UserFavoriteDto(
        FavoriteId id,
        ListingResponseDto listing) {
}
