package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CategoryRepository;
import com.manumafe.vbnb.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategoryById(Long id) throws ResourceNotFoundException {
        categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category with id: " + id + " not found"));

        categoryRepository.deleteById(id);
    }

    @Override
    public Category findCategoryById(Long id) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category with id: " + id + " not found"));

        return category;
    }

    @Override
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }
}
