package com.manumafe.vbnb.service;

import com.manumafe.vbnb.entity.AuthenticationRequest;
import com.manumafe.vbnb.entity.AuthenticationResponse;
import com.manumafe.vbnb.entity.RegisterRequest;
import com.manumafe.vbnb.exceptions.UnauthorizedException;

import com.manumafe.vbnb.exceptions.EmailAlreadyRegisteredException;

public interface AuthenticationService {
    
    AuthenticationResponse register(RegisterRequest request) throws EmailAlreadyRegisteredException;

    AuthenticationResponse authenticate(AuthenticationRequest request) throws UnauthorizedException;
}
