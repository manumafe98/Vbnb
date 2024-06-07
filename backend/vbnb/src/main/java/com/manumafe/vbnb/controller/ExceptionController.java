package com.manumafe.vbnb.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.manumafe.vbnb.entity.ApiResponse;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handeResourceNotFoundException(ResourceNotFoundException exception) {
        ApiResponse response = new ApiResponse(exception.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
