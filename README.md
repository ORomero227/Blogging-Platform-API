# Blogging Platform API

This is a simple RESTful API for a blogging platform, built with Node.js, TypeScript, and MySQL.

## Features

* **Get all articles:** Retrieves a list of all articles in the database.
* **Get article by ID:** Retrieves a specific article by its ID.
* **Create a new article:** Creates a new article in the database.
* **Update an article:** Updates an existing article by its ID.
* **Delete an article:** Deletes an article by its ID.

## Technologies Used

* Node.js
* TypeScript
* Express.js
* MySQL
* mysql2/promise
* dotenv

## Prerequisites

* Node.js (v14 or later)
* npm, yarn or pnpm
* MySQL

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ORomero227/Blogging-Platform-API.git
    cd <repository_name>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Create a `.env` file in the root of the project and configure environment variables:**

    ```
    PORT=3001
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_NAME=<your_database_name>
    ```

4.  **Create the database and the `articles` table in MySQL:**

    ```sql
    CREATE DATABASE <your_database_name>;

    USE <your_database_name>;

    CREATE TABLE articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL
    );
    ```

## Execution

1.  **Start the server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm run dev
    ```

2.  **The API will be available at `http://localhost:3001/api`.**

## Endpoints

* **GET /api/articles:** Get all articles.
* **GET /api/articles/:id:** Get article by ID.
* **POST /api/articles:** Create a new article.
* **PUT /api/articles/:id:** Update article by ID.
* **DELETE /api/articles/:id:** Delete article by ID.

## Usage Examples (with Postman)

### Get all articles

* **Method:** `GET`
* **URL:** `http://localhost:3001/api/articles`

### Get article by ID

* **Method:** `GET`
* **URL:** `http://localhost:3001/api/articles/1`

### Create a new article

* **Method:** `POST`
* **URL:** `http://localhost:3001/api/articles`
* **Body (JSON):**

    ```json
    {
      "title": "My new article",
      "body": "Article content"
    }
    ```

### Update an article

* **Method:** `PUT`
* **URL:** `http://localhost:3001/api/articles/1`
* **Body (JSON):**

    ```json
    {
      "title": "Updated title",
      "body": "Updated content"
    }
    ```

### Delete an article

* **Method:** `DELETE`
* **URL:** `http://localhost:3001/api/articles/1`
