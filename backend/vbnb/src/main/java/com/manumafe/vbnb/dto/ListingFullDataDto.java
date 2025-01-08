package com.manumafe.vbnb.dto;

import java.util.Set;
import java.util.List;

import com.manumafe.vbnb.entity.FavoriteId;
import com.manumafe.vbnb.entity.Image;
import com.manumafe.vbnb.entity.Reserve;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListingFullDataDto {
    private Long id;
    private String title;
    private String description;
    private String ownerPhoneNumber;
    private CityDto city;
    private CategoryDto category;
    private Set<Image> images;
    private Set<CharacteristicDto> characteristics;
    private List<Reserve> reserves;
    private Set<FavoriteId> favoriteIds;
}
