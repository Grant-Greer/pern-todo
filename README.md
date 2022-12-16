# pern-todo

Todo List App
This is a simple todo list application built using the PERN (PostgreSQL, Express, React, Node.js) stack, with added authentication and authorization and Prisma as the database toolkit.

## Demo

https://pern-todo-app.netlify.app/

## Features

Create a new todo list
Add, edit, and delete todo items
Login and logout functionality

## Getting Started

### Clone this repository to your local machine:

````bash

git clone

    ```
### Install dependencies

    ```bash
    cd pern-todo
    npm install
    ```
### Create a .env file in the root directory and add the following environment variables:

    ```bash
    PORT=5000
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public"

    ```
### Create a database in PostgreSQL and add the database name to the DATABASE_URL environment variable in the .env file.
### Run the following commands to create the tables in the database:

    ```bash
    npx prisma migrate dev
    npx prisma db seed
    ```
### Start the server:

    ```bash
    npm run dev
    ```
### Open http://localhost:5000 in your browser to view the app.

### Built With
PostgreSQL - Relational database management system
Express - Web application framework for Node.js
React - JavaScript library for building user interfaces
Node.js - JavaScript runtime environment
Prisma - Open-source database toolkit
License
This project is licensed under the MIT License - see the LICENSE file for details.
````
