package com.manumafe.vbnb.dto;

import java.util.Set;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListingCreateDto {
    private String title;
    private String description;
    private String ownerPhoneNumber;
    private Long cityId;
    private Long categoryId;
    private Set<String> images;
    private Set<Long> characteristicIds;
}
