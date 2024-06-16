package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.dto.CategoryDto;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface CategoryService {
    CategoryDto saveCategory(CategoryDto categoryDto) throws ResourceAlreadyExistentException;

    void deleteCategory(Long id) throws ResourceNotFoundException;

    List<CategoryDto> findAllCategories();
}
