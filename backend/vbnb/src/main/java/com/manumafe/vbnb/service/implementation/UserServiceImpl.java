package com.manumafe.vbnb.service.implementation;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.UserDto;
import com.manumafe.vbnb.dto.mapper.UserDtoMapper;
import com.manumafe.vbnb.entity.User;
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
    public UserDto updateUser(UserDto userDto) {
        User user = userRepository.findById(userDto.id())
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + userDto.id() + " not found"));
        
        user.setName(userDto.name());
        user.setLastName(userDto.lastName());
        user.setEmail(userDto.email());
        user.setUserRole(userDto.role());

        userRepository.save(user);

        return userDtoMapper.toDto(user);
    }

    @Override
    public List<UserDto> findAllUsers() {
        return userRepository.findAll().stream().map(userDtoMapper::toDto).toList();
    }

    @Override
    public UserDto getUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return userDtoMapper.toDto(user);
    }
}