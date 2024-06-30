package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.UserDto;
import com.manumafe.vbnb.dto.mapper.UserDtoMapper;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;

    @Override
    public UserDto updateUserRole(Long userId, UserRole role) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + " not found"));
        
        user.setUserRole(role);

        userRepository.save(user);

        return userDtoMapper.toDto(user);
    }

    @Override
    public List<UserDto> findAllUsers() {
        return userRepository.findAll().stream().map(userDtoMapper::toDto).toList();
    }

    @Override
    public void deleteUserById(long userId) throws ResourceNotFoundException {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userId + " not found"));

        userRepository.deleteById(userId);
    }
}
