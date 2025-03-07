package com.manumafe.vbnb.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manumafe.vbnb.dto.CategoryDto;
import com.manumafe.vbnb.dto.mapper.CategoryDtoMapper;
import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CategoryRepository;
import com.manumafe.vbnb.service.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryDtoMapper categoryDtoMapper;

    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) throws ResourceAlreadyExistentException {
        Optional<Category> optionalCategory = categoryRepository.findByName(categoryDto.getName());

        if (optionalCategory.isPresent()) {
            throw new ResourceAlreadyExistentException("Category with name: " + categoryDto.getName() + " already exists");
        }

        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setImageUrl(categoryDto.getImageUrl());

        categoryRepository.save(category);

        return categoryDtoMapper.toDto(category);
    }

    @Override
    public void deleteCategory(Long id) throws ResourceNotFoundException {
        categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category with id: " + id + " not found"));

        categoryRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDto> findAllCategories() {
        return categoryRepository.findAll().stream().map(categoryDtoMapper::toDto).toList();
    }
}
