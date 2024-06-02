package com.manumafe.vbnb.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.entity.Category;
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
}
