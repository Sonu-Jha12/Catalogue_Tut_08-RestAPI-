# 🍽️ Secure Catalogue REST API – Node.js & Express

A full-stack **Catalogue Management Application with API Security**, developed as part of the **CS543 – Web Services** course at the Indian Institute of Information Technology Vadodara (IIIT Vadodara).

This project demonstrates how to build RESTful APIs using **Node.js and Express.js**, connect them with a frontend using HTML, CSS, and JavaScript, and secure API endpoints using **JWT Authentication, bcrypt Password Hashing, and Role-Based Authorization**.

## 📌 Project Overview

The application provides a catalogue of dishes where users can:

- View available dishes after authentication.
- Log in using email and password.
- Generate and receive a JSON Web Token (JWT).
- Access protected API endpoints using a Bearer token.
- Add new dishes with restaurant-level authorization.
- Validate incoming request data.
- Communicate between frontend and backend using the Fetch API.

The application follows this architecture:

**Browser (Frontend) → REST API (Node.js + Express) → Authentication & Authorization → In-Memory Data Storage**

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend web framework |
| HTML5 | Frontend structure |
| CSS3 | Frontend styling |
| JavaScript | Client-side functionality |
| JSON Web Token (JWT) | User authentication |
| bcryptjs | Password hashing and verification |
| REST API | Client-server communication |
| Fetch API | Frontend API requests |
| npm | Package management |

## 🔐 API Security Implementation

This project extends the basic Catalogue REST API by implementing authentication and authorization.

### 1. Password Hashing with bcryptjs

- Passwords are never stored as plain text.
- bcryptjs generates one-way password hashes.
- `bcrypt.hashSync()` hashes passwords.
- `bcrypt.compareSync()` verifies login credentials.

### 2. JWT Authentication

- Users log in through the `POST /login` endpoint.
- The server verifies their email and password.
- A signed JWT is generated after successful authentication.
- The token contains the user's ID (`sub`) and role.
- Tokens expire after one hour.

### 3. Authentication Middleware

The `auth` middleware:

- Reads the JWT from the Authorization header.
- Verifies the token using the secret key.
- Checks token validity and expiration.
- Returns HTTP 401 if the token is missing or invalid.

### 4. Role-Based Authorization

The `requireRole()` middleware checks whether an authenticated user has permission to perform an operation.

| User Role | Permission |
|---|---|
| Customer | View the catalogue |
| Restaurant | View the catalogue and add dishes |
| Admin | Can add dishes when granted the admin role |

### Authentication vs Authorization

| Authentication | Authorization |
|---|---|
| Identifies the user | Checks user permissions |
| Verifies JWT | Checks user role |
| HTTP 401 if authentication fails | HTTP 403 if access is forbidden |

## 🔗 REST API Endpoints

| HTTP Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/login` | No | Authenticate user and generate JWT |
| GET | `/items` | Required | Retrieve all catalogue items |
| POST | `/items` | Restaurant/Admin | Add a new dish |

### HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | OK – Request successful |
| 201 | Created – New dish added |
| 401 | Unauthorized – Missing or invalid token |
| 403 | Forbidden – Insufficient permissions |
| 422 | Unprocessable Entity – Invalid input |

## 👥 Demo Login Credentials

The application includes two predefined demo users.

| Role | Email | Password |
|---|---|---|
| Customer | asha@campus.edu | customer123 |
| Restaurant | mealhub@campus.edu | resto123 |

**Note:** These are demonstration credentials for the local project only.

## 🧪 Testing the API

You can test the API using cURL, Postman, or Hoppscotch.

### 1. Login as a Customer

**Request:**

```http
POST /login
Content-Type: application/json
```

Request Body:

```json
{
  "email": "asha@campus.edu",
  "password": "customer123"
}
```

Successful Response:

```json
{
  "token": "your_generated_jwt_token"
}
```

### 2. Login as a Restaurant

```json
{
  "email": "mealhub@campus.edu",
  "password": "resto123"
}
```

The server generates a JWT containing the authenticated user's ID and role.

### 3. Access the Catalogue

Send the generated token in the Authorization header.

```http
GET /items
Authorization: Bearer YOUR_JWT_TOKEN
```

Successful Response:

```json
[
  {
    "id": 1,
    "name": "Veg Thali",
    "price": 90
  },
  {
    "id": 2,
    "name": "Paneer Roll",
    "price": 70
  }
]
```

### 4. Add a New Dish

Only an authenticated restaurant or admin can add a dish.

```http
POST /items
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

Request Body:

```json
{
  "name": "Masala Dosa",
  "price": 60
}
```

Successful Response:

```json
{
  "id": 3,
  "name": "Masala Dosa",
  "price": 60
}
```

### 5. Test Unauthorized Access

| Scenario | Expected Result |
|---|---|
| Access `/items` without a token | 401 Unauthorized |
| Access `/items` with an invalid token | 401 Unauthorized |
| Customer attempts to add a dish | 403 Forbidden |
| Restaurant adds a valid dish | 201 Created |
| Add a dish without a name | 422 Unprocessable Entity |

## 📂 Project Structure

```text
Catalogue/
│
├── server.js
├── package.json
├── package-lock.json
├── README.md
│
└── public/
    ├── index.html
    └── style.css
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- Git
- Postman or Hoppscotch (optional, for API testing)

### 1. Clone the Repository

```bash
git clone https://github.com/Sonu-Jha12/Catalogue_Tut_08-RestAPI-.git
```

### 2. Navigate to the Project Directory

```bash
cd Catalogue_Tut_08-RestAPI-
```

### 3. Install Dependencies

```bash
npm install
```

If installing the packages individually:

```bash
npm install express
npm install jsonwebtoken
npm install bcryptjs
```

### 4. Start the Server

```bash
node server.js
```

Expected terminal output:

```text
Secured Catalogue on http://localhost:3000
```

### 5. Open the Application

Visit:

```text
http://localhost:3000
```

## 📚 Concepts Learned

Through this project, I gained practical experience with the following concepts:

**Backend Development**
- Creating Node.js applications using npm.
- Setting up an Express.js server.
- Implementing RESTful API endpoints.
- Handling GET and POST HTTP methods.
- Working with request parameters and JSON request bodies.
- Serving static frontend files using `express.static()`.

**API Security**
- Understanding authentication and authorization.
- Implementing JWT-based authentication.
- Generating and verifying JWT tokens using `jsonwebtoken`.
- Hashing passwords using bcryptjs.
- Implementing authentication middleware.
- Implementing role-based access control.
- Understanding HTTP 401 vs HTTP 403.
- Protecting API endpoints against unauthorized access.

**Frontend and API Integration**
- Connecting frontend and backend.
- Making HTTP requests using JavaScript Fetch API.
- Understanding client-server communication.
- Handling JSON responses and API errors.

**API Validation**
- Validating incoming request data.
- Handling different HTTP status codes.
- Understanding the importance of input validation.

## ⚠️ Important Notes and Security Considerations

This is an educational project designed for learning REST API development and API security.

- User accounts are stored in an in-memory array.
- Catalogue items are stored in memory and are lost when the server restarts.
- The JWT secret in the demonstration code is hardcoded.
- The demo credentials are intended for local testing only.
- Production applications should store secrets in environment variables using a `.env` file.
- `.env` files must never be committed to GitHub.
- HTTPS should always be used in production.
- Production applications should use persistent database storage.
- Additional validation, rate
