# 🎯 Quiz Website

## 📌 Overview

My first full-stack website(25/08/2024).This is a quiz website where users can select their favorite subject, take quizzes, and get their scores calculated automatically. The website also includes an admin panel where administrators can add and update questions.

## 🚀 Features

- ✅ Users can choose their favorite subject and attempt quizzes.
- 📊 Automatic score calculation after quiz completion.
- 🔐 Admin panel for adding and updating questions.
- 🔑 Secure authentication for admin access.

## 🛠 Tech Stack

- 🎨 **Frontend**: React + Vite
- ⚙️ **Backend**: Spring Boot
- 🗄 **Database**: MySQL

## 🏗 Installation and Setup

### 📋 Prerequisites

Ensure you have the following installed:

- 📌 Node.js and npm
- ☕ Java 21
- 🛢 MySQL

### 🔧 Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/DevIQ.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Configure MySQL database settings in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/quizdb
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
4. Build and run the backend:
   ```sh
   mvn spring-boot:run
   ```

### 🎨 Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

## 🔑 Admin Panel

- **Default Admin Credentials:**
  - 👤 **Username:** admin
  - 🔑 **Password:** admin123

## 🎮 Usage

1. 📚 Open the website and select a subject to start the quiz.
2. 📝 Answer the questions and submit to see your score.
3. 🛠 Admins can log in to the admin panel to add or update quiz questions.

## 🚀 Future Enhancements

- 🔐 Implement user authentication for non-admin users.
- 🎨 Improve UI/UX.


