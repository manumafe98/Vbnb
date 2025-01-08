package com.manumafe.vbnb.dto;

import com.manumafe.vbnb.entity.FavoriteId;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FavoriteDto {
    private FavoriteId id;
}
