package com.manumafe.vbnb.service;

import java.util.concurrent.CompletableFuture;

import com.manumafe.vbnb.entity.RegisterRequest;
import com.manumafe.vbnb.entity.Reserve;

import jakarta.mail.MessagingException;

public interface EmailService {

    public CompletableFuture<Void> sendSuccessfulRegistrationEmail(RegisterRequest request) throws MessagingException;

    public CompletableFuture<Void> sendSucessfulReserveEmail(Reserve reserve) throws MessagingException;
}
