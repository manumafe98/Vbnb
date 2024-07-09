package com.manumafe.vbnb.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@OpenAPIDefinition(
    info = @Info(
        title = "Vbnb - Open Api Documentation",
        version = "1.0",
        description = """
            Welcome to the Vbnb API! This API provides access to Vbnb's vacation rental platform,
            allowing developers to interact with listings, reservations, user profiles, and more.

            Whether you're building a new app or integrating with an existing system,
            our API offers the tools you need to create a seamless experience for users looking to find and reserve vacation rentals.

            ### Key Features
            - **Listings:** Browse and manage vacation rental properties.
            - **Reserves:** Create and manage reservations for users.
            - **Favorites:** Add properties that you like to your personalized favorites list.
            - **Ratings:** Rate our properties.

            ### Getting Started
            To start using the Vbnb API, you need to be registered and obtain a JWT (JSON Web Token) for authentication.

            1. **Register:** If you haven't already, register ain our /register endpoint.
            2. **Obtain JWT:** After registration, obtain a JWT by authenticating with your credentials. 
            3. **Authentication:** Include the obtained JWT in the `Authorization` header of your requests with the `Bearer` scheme.
            """
    ),
    security = {
        @SecurityRequirement(name = "bearerAuth")
    }
)
@SecurityScheme(
    name = "bearerAuth",
    description = "JWT Authentication",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)
public class OpenApiConfiguration {}
