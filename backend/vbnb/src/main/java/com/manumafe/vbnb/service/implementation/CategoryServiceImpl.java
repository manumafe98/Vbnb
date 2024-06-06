package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.CategoryDto;
import com.manumafe.vbnb.dto.mapper.CategoryDtoMapper;
import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CategoryRepository;
import com.manumafe.vbnb.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryDtoMapper categoryDtoMapper;

    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) {
        Category category = new Category();
        
        category.setName(categoryDto.name());
        category.setImageUrl(categoryDto.imageUrl());

        categoryRepository.save(category);

        return categoryDtoMapper.toDto(category);
    }

    @Override
    public void deleteCategory(Long id) throws ResourceNotFoundException {
        categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category with id: " + id + " not found"));

        categoryRepository.deleteById(id);
    }

    @Override
    public List<CategoryDto> findAllCategories() {
        return categoryRepository.findAll().stream().map(categoryDtoMapper::toDto).toList();
    }
}
