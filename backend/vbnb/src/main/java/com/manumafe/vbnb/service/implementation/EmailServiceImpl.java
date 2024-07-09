package com.manumafe.vbnb.service.implementation;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.manumafe.vbnb.entity.RegisterRequest;
import com.manumafe.vbnb.entity.Reserve;
import com.manumafe.vbnb.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${SPRING_MAIL_USERNAME}")
    private String fromEmail;

    @Override
    public CompletableFuture<Void> sendSuccessfulRegistrationEmail(RegisterRequest request) throws MessagingException {
        return CompletableFuture.runAsync(() -> {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(fromEmail);
                helper.setTo(request.getEmail());
                helper.setSubject("Successful Registration");

                Context context = new Context();
                context.setVariable("loginUrl", "http://localhost:5173/auth/signin");
                context.setVariable("name", request.getName());
                context.setVariable("lastName", request.getLastName());
                context.setVariable("email", request.getEmail());

                String htmlContent = templateEngine.process("registration-success", context);
                helper.setText(htmlContent, true);

                mailSender.send(message);
            } catch(MessagingException e) {
                System.out.println(e);
            }
        });
    }

    @Override
    public CompletableFuture<Void> sendSucessfulReserveEmail(Reserve reserve) throws MessagingException {
        return CompletableFuture.runAsync(() -> {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(fromEmail);
                helper.setTo(reserve.getUser().getEmail());
                helper.setSubject("Successful Reservation");

                Context context = new Context();
                context.setVariable("userReservesUrl", "http://localhost:5173/user/reserves");
                context.setVariable("title", reserve.getListing().getTitle());
                context.setVariable("checkIn", reserve.getCheckInDate());
                context.setVariable("checkOut", reserve.getCheckOutDate());

                String htmlContent = templateEngine.process("reserve-success", context);
                helper.setText(htmlContent, true);

                mailSender.send(message);
            } catch(MessagingException e) {
                System.out.println(e);
            }
        });
    }
}
