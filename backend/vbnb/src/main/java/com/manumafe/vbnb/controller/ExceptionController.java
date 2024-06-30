package com.manumafe.vbnb.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.manumafe.vbnb.entity.ApiResponse;
import com.manumafe.vbnb.exceptions.EmailAlreadyRegisteredException;
import com.manumafe.vbnb.exceptions.ListingUnavailableForReserves;
import com.manumafe.vbnb.exceptions.ResourceAlreadyExistentException;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.exceptions.UnauthorizedException;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {
        ApiResponse response = new ApiResponse(exception.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse> handleUnauthorizedException(UnauthorizedException exception) {
        ApiResponse response = new ApiResponse(exception.getMessage());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    public ResponseEntity<ApiResponse> handleEmailAlreadyRegisteredException(EmailAlreadyRegisteredException exception) {
        ApiResponse response = new ApiResponse(exception.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(ResourceAlreadyExistentException.class)
    public ResponseEntity<ApiResponse> handleResourceAlreadyExistentException(ResourceAlreadyExistentException exception) {
        ApiResponse response = new ApiResponse(exception.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(ListingUnavailableForReserves.class)
    public ResponseEntity<ApiResponse> handleListingUnavailableForReservesException(ListingUnavailableForReserves exception) {
        ApiResponse response = new ApiResponse(exception.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
}
