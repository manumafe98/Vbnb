package com.manumafe.vbnb.exceptions;

public class ResourceAlreadyExistentException extends RuntimeException{
    public ResourceAlreadyExistentException(String message) {
        super(message);
    }
}
