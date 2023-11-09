# Game-night

Game-night is a web application that aims to bring board game enthusiasts together by providing a platform to connect, schedule game nights, and enjoy their favorite games with like-minded people. This project was developed by Gili Menahem, a skilled full-stack developer, using React.js, Node.js, Express, MongoDB, and Redux.

## Table of Contents
* Features
* Technologies Used
* Getting Started
* Installation
* Usage
* Contributing
* License

## Features
* User Registration and Authentication: Users can create accounts, log in, and authenticate securely.
* Game Listings: Users can browse and search for various board games available on the platform.
* Event Scheduling: Users can create and join game events, and set their own dates.
* Interactive Dashboard: A user-friendly dashboard displays upcoming events.

## Technologies Used
### Frontend:
React.js
Redux (State Management)
SASS (Semantic UI for styling)
Axios (HTTP requests)

### Backend:
Node.js
Express (RESTful API)
MongoDB (Database)
Mongoose (ODM for MongoDB)

### Authentication:
JSON Web Tokens (JWT)

## Getting Started
To get started with the Board Game Connect project, follow these steps:

### Installation
* Clone the repository to your local machine

* Change directory to the project folder:

cd game-night

* Install frontend and backend dependencies:

cd client
npm install
cd ../server
npm install



* Start the backend server:

cd server
npm start
The server will run on http://localhost:8000.

* Start the frontend development server:
cd client
npm start
The React development server will run on http://localhost:3000.

Open your browser and visit http://localhost:3000 to access the Board Game Connect web application.

importnat!
make sure you add an env file, that contains:
PORT=8000
MONGO_URI="YOUR MONGO URI HERE"
JWT_SECRET="YOUR SECRET HERE"
otherwise this won't work

License
This project is licensed under the MIT License - see the LICENSE file for details.

Happy gaming! 🎲✨