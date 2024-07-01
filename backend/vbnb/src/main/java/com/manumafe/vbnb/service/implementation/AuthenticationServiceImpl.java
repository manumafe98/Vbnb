package com.manumafe.vbnb.service.implementation;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.entity.AuthenticationRequest;
import com.manumafe.vbnb.entity.AuthenticationResponse;
import com.manumafe.vbnb.entity.RegisterRequest;
import com.manumafe.vbnb.entity.User;
import com.manumafe.vbnb.entity.UserRole;
import com.manumafe.vbnb.exceptions.UnauthorizedException;
import com.manumafe.vbnb.exceptions.EmailAlreadyRegisteredException;
import com.manumafe.vbnb.repository.UserRepository;
import com.manumafe.vbnb.service.AuthenticationService;
import com.manumafe.vbnb.service.EmailService;
import com.manumafe.vbnb.service.JwtService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Override
    public AuthenticationResponse register(RegisterRequest request) throws EmailAlreadyRegisteredException {
        var user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.USER)
                .build();

        Optional<User> checkUser = userRepository.findByEmail(request.getEmail());

        if (checkUser.isPresent()) {
            throw new EmailAlreadyRegisteredException("Email already registered");
        }

        userRepository.save(user);

        try {
            emailService.sendSuccessfulRegistrationEmail(request);
        } catch (MessagingException e) {
            System.out.println(e);
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getUserRole())
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) throws UnauthorizedException {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (!user.isPresent()) {
            throw new UnauthorizedException("User not found");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));
        } catch (Exception e) {
            throw new UnauthorizedException("Incorrect password");
        }

        var jwtToken = jwtService.generateToken(user.get());

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.get().getUserRole())
                .build();
    }
}
