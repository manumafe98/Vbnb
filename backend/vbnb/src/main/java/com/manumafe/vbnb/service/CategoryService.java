package com.manumafe.vbnb.service;

import java.util.List;

import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

public interface CategoryService {
    Category saveCategory(Category category);

    void deleteCategory(Long id) throws ResourceNotFoundException;

    List<Category> findAllCategories();
}
