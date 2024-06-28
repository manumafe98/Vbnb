package com.manumafe.vbnb.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/*",
            "/api-docs/*",
            "/swagger-ui/*",
            "/v3/api-docs/*",
            "/swagger-ui.html",
            "/api/v1/category/all",
            "/api/v1/city/all",
            "/api/v1/listing/all",
            "/api/v1/listing/get/*",
            "/api/v1/listing/available*",
            "/api/v1/listing/available/*",
            "/api/v1/listing/by-city-category*",
            "/api/v1/listing/available/by-category-city**",
            "/api/v1/listing/city/*",
            "/api/v1/listing/category/*",
            "/api/v1/characteristic/all",
            "/api/v1/rating/info/*",
            "/api/v1/rating/get/*"
    };
    private static final String[] ADMIN_ACCESS_URL = {
            "/api/v1/category/*",
            "/api/v1/city/*",
            "/api/v1/characteristic/*",
            "/api/v1/user/all",
            "/api/v1/user/update/*",
            "/api/v1/listing/create",
            "/api/v1/listing/update/*",
            "/api/v1/listing/delete/*",
            "/api/v1/listing/full"
    };
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(WHITE_LIST_URL).permitAll()
                        .requestMatchers(ADMIN_ACCESS_URL).hasAuthority("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
