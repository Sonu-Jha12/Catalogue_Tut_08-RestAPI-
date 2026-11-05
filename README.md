# 🍽️ Catalogue REST API – Node.js & Express

A simple full-stack **Catalogue Management Application** developed as part of the CS543 – Web Services course at IIIT Vadodara.

This project demonstrates how to build a REST API using **Node.js and Express.js** and connect it with a frontend built using HTML, CSS, and JavaScript.

## 📌 Project Overview

The application provides a menu of dishes where users can:
- View all available dishes.
- Retrieve a particular dish using its ID.
- Add new dishes through an HTML form.
- View updated menu items without refreshing the page.

The application follows a three-layer architecture:

**Browser (Frontend) → REST API (Node.js + Express) → Data (In-Memory Storage)**

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Backend web framework.
- **HTML5** – Frontend structure.
- **CSS3** – Frontend styling.
- **JavaScript** – Client-side functionality and API requests.
- **REST API** – Communication between frontend and backend.
- **npm** – Package management.

## 📂 Project Structure

```text
Catalogue/
│
├── server.js
├── package.json
├── package-lock.json
│
└── public/
    ├── index.html
    └── style.css
```

## ⚙️ Installation and Setup

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

### 4. Start the Server

```bash
node server.js
```

### 5. Open the Application

Visit the following URL in your browser:

```text
http://localhost:3000
```

## 🔗 REST API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Access the Catalogue application |
| GET | `/items` | Retrieve all dishes |
| GET | `/items/:id` | Retrieve a dish by ID |
| POST | `/items` | Add a new dish |

### Example API Requests

**1. Get All Dishes**

```http
GET /items
```

Response:

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

**2. Get a Dish by ID**

```http
GET /items/1
```

**3. Add a New Dish**

```http
POST /items
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

## 📚 Concepts Learned

Through this project, I explored:

- Creating a Node.js project using npm.
- Setting up an Express.js server.
- Understanding REST API architecture.
- Implementing GET and POST HTTP methods.
- Handling request parameters using `req.params`.
- Handling JSON request bodies using `req.body`.
- Implementing HTTP status codes such as 200, 201, 404, and 422.
- Serving static frontend files using `express.static()`.
- Connecting frontend and backend using JavaScript Fetch API.
- Understanding client-server communication.

## ⚠️ Note About Data Storage

This project currently uses **in-memory storage** to manage menu items.

Therefore, newly added dishes are lost whenever the server restarts.

A database can be integrated in the next stage to provide persistent data storage.

## 🚀 Future Improvements

- Add DELETE functionality to remove dishes.
- Add PUT/PATCH functionality to update dishes.
- Implement search and filtering using query parameters.
- Integrate MySQL or MongoDB for persistent storage.
- Improve input validation and error handling.

## 👨‍💻 Author

**Sonu Jha**

Master of Computer Applications (MCA)  
Indian Institute of Information Technology Vadodara (IIIT Vadodara)

**Course:** CS543 – Web Services  
**Instructor:** Dr. Pramit Mazumdar

---

⭐ If you find this project useful, feel free to explore the repository and provide feedback.

**GitHub Repository:**  
https://github.com/Sonu-Jha12/Catalogue_Tut_08-RestAPI-
