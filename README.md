# Book Club 

## Overview

The Book Club App is a web application that allows users to manage their reading activities, join book clubs, participate in discussion forums, and receive book recommendations based on their reading history and preferences. The app is built using Node.js with Express for the backend and React for the frontend, and it uses SQLite as the database.

## Features

- **User Authentication**: Sign up, log in, and log out.
- **Profile Management**: Update profile information and manage reading preferences.
- **Book Club Management**: Create, join, and leave book clubs.
- **Book List**: Add books to reading lists and mark them as read, currently reading, or want to read.
- **Discussion Forums**: Participate in book discussions within book clubs.
- **Book Search**: Search for books by id.


## Tech Stack

- **Backend**: Node.js, Express, SQLite, TypeORM
- **Frontend**: React, Axios, React Router
- **Authentication**: JWT, bcryptjs

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Akilanakul/BookClub.git
   cd BookClub
   
2. Install backend dependencies:
   cd backend
   npm install

3. Set up the database: The SQLite database will be set up automatically by TypeORM. No manual setup is required.

4. Start the backend server:
   npm start
   The server will start on http://localhost:3000.

5. Frontend Setup
   cd ../frontend
   npm install
   npm start
   The frontend will start on http://localhost:3001.
