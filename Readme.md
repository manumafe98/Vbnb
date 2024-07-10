# Vbnb

## Project Description

Vbnb is a comprehensive listing service application that allows users to manage and interact with property listings. It provides functionalities for user authentication, property management, reservations, ratings, and more.

## Architecture

The application is containerized using Docker and consists of four main services:

1. Production PostgreSQL Database
2. Test PostgreSQL Database
3. Backend Service (Java 17 Spring Boot)
4. Frontend Service (React with Vite)

## Color Palette

![Vbnb color palette](https://github.com/manumafe98/Vbnb/assets/95315128/9f930c43-dbc1-4cef-a181-44efdb4615d3)

- Brand color: ``#FF6F00``
- Background: ``#FFFFFF``
- Borders and Lines: ``#E0E0E0``
- Links: ``#3b82f6``

## UML Diagram

![vbnb_uml](https://github.com/manumafe98/Vbnb/assets/95315128/4654de24-c32d-425e-ae8c-6950260daec1)

## API Endpoints

### Authentication Controller `/api/v1/auth`

- `POST /register`: Register a new user
- `POST /authenticate`: Authenticate a user

### Category Controller `/api/v1/category`

- `POST /`: Create a category
- `GET /all`: Get all categories
- `DELETE /{id}`: Delete category by ID

### Characteristic Controller `/api/v1/characteristic`

- `POST /`: Create characteristic
- `GET /all`: Get all characteristics
- `PUT /{id}`: Update characteristic by ID
- `DELETE /{id}`: Delete characteristic by ID

### City Controller `/api/v1/city`

- `POST /`: Create city
- `GET /all`: Get all cities
- `GET /{id}`: Get city by ID
- `PUT /{id}`: Update city by ID
- `DELETE /{id}`: Delete city by ID

### Favorite Controller `/api/v1/favorite`

- `POST /`: Add a listing to favorites
- `DELETE /`: Delete a listing from favorites
- `GET /{userEmail}`: Get favorites by user email

### Rating Controller `/api/v1/rating`

- `POST /`: Add rating to a listing
- `PUT /`: Update the rating of a listing
- `GET /get/{listingId}`: Get ratings of a listing
- `GET /info/{listingId}`: Get amount of times rated and average of a listing

### Reserve Controller `/api/v1/reserve`

- `POST /`: Add a reserve for a listing
- `DELETE /`: Delete a reserve for a listing
- `PUT /`: Update a reserve for a listing
- `GET /listing/{listingId}`: Get the reserves of a listing
- `GET /user/{userEmail}`: Get the reserves of a user (historically)
- `GET /current/{userEmail}`: Get the current reserves of a user

### User Controller `/api/v1/user`

- `GET /all`: Get all users
- `PUT /update/{userId}`: Update user role
- `DELETE /delete/{userId}`: Delete a user

### Listing Controller `/api/v1/listing`

- `POST /create`: Create a listing
- `GET /all`: Get all listings
- `PUT /update/{id}`: Update listing by listing ID
- `GET /get/{id}`: Get listing by listing ID
- `DELETE /delete/{id}`: Delete listing by listing ID
- `GET /category/{category}`: Get listings by category name
- `GET /city/{city}`: Get listings by city name
- `GET /available`: Get available listings (non-reserved) for a range of dates
- `GET /by-city-category`: Get listings by city and category names
- `GET /available/by-city`: Get available listings for a range of dates and city name
- `GET /available/by-category`: Get available listings for a range of dates and category name
- `GET /available/by-category-city`: Get available listings for a range of dates, category name and city name
- `GET /full`: Get listing with more information

## Exception Handling

The application handles the following exceptions:

- ResourceNotFoundException
- UnauthorizedException
- EmailAlreadyRegisteredException
- ResourceAlreadyExistentException
- ListingUnavailableForReserves

## Installation and Setup

1. Ensure you have Docker installed on your system.

2. Clone the repository:

    ```bash
    git clone [repository-url]
    ```

3. Set up environment variables:
   - Locate the [.env-example](.env-example) file in the root directory of the project.
   - Create a new file named `.env` in the same directory.
   - Copy the contents of `.env-example` into `.env`.
   - Fill in the required environment variables in the `.env` file.

4. External service requirements:
   - Cloudinary account:
     - Create an unsigned upload preset.
     - Obtain your Cloudinary API key.
   - Gmail account:
     - Set up an App password for SMTP email sending.
   - JWT authentication:
     - Generate a Base64-encoded secret key for JWT authentication.

5. Update the `.env` file with the obtained credentials and keys.

6. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

Note: The Docker Compose file uses the environment variables defined in the `.env` file. Ensure all required variables are properly set before running the containers.
