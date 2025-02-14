# User Management API  

## Overview  
A backend application built with **Express.js** and **MongoDB** that allows user registration, authentication using JWT, and searching for users by username or email.  

## Features  
- **User Registration** (Stores user details securely)  
- **User Login** (JWT-based authentication)  
- **Search User** (Retrieve user details by username or email)  

## Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Token)  

## Installation  
1. Clone the repository:  
   ```sh
   git clone https://github.com/Abhishekkvpnld/Toposel-backend.git  
   cd server  
   ```  
2. Install dependencies:  
   ```sh
   npm install  
   ```  
3. Set up **.env** file:  
   ```sh
   PORT=4000
   FRONTEND_URL=frontend_url
   NODE_ENV=development
   MONGODB_URI_LOCAL=your_mongodb_connection_string  
   JWT_SECRET_KEY=your_jwt_secret  
   ```  
4. Start the server:  
   ```sh
   npm run dev  
   ```  
   

## Usage  
- Use **Postman** to test API endpoints.  
- Ensure to pass JWT token in the **Authorization** header for protected routes.  


