package com.manumafe.vbnb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manumafe.vbnb.dto.UserDto;
import com.manumafe.vbnb.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<UserDto> getAuthenticatedUser() {
        UserDto user = userService.getUser();

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getUsers() {
        List<UserDto> users = userService.findAllUsers();

        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
        UserDto user = userService.updateUser(userDto);

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
