package com.manumafe.vbnb.dto;

import java.util.Set;

import com.manumafe.vbnb.entity.Image;
import com.manumafe.vbnb.entity.ListingCharacteristic;

public record ListingDto(
                Long id,
                String title,
                String description,
                Long cityId,
                Long categoryId,
                Set<Image> images,
                Set<ListingCharacteristic> characteristics) {
}
