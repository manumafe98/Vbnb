package com.manumafe.vbnb.dto.mapper;

import org.springframework.stereotype.Component;

import com.manumafe.vbnb.dto.CategoryDto;
import com.manumafe.vbnb.entity.Category;

@Component
public class CategoryDtoMapper {

    public CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getName(),
                category.getImageUrl());
    }
}
