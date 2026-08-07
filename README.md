# Meeting Scheduling Platform

A web application that allows users to find other people on the platform and arrange meetings with them. Users can browse profiles, choose a meeting topic, set a location, and pick a date and time.

The project was built with a React frontend and a CodeIgniter 4 backend. It was developed locally using XAMPP for running the server and MySQL database.

## Features

* Create and manage meetings
* View upcoming and past meetings
* Search for other users
* View user profiles
* Schedule meetings with a selected topic, location, date, and time

## Tech Stack

* **Frontend:** React
* **Backend:** CodeIgniter 4
* **Database:** MySQL

## Setup

### Requirements

Before running the project, make sure you have:

* Node.js and npm
* PHP
* Composer
* MySQL
* A local server environment (XAMPP was used during development)

### Installing dependencies

Install the frontend packages:

```bash
cd frontend
npm install
```

Install the backend packages:

```bash
cd ../backend
composer install
```

## Database Configuration

The backend includes an example environment configuration file:

```text
backend/env_example
```

Copy this file and update the database settings if needed.

The default database name is:

```text
msp
```

Make sure the database has been created before starting the application.

## Running the Project

Start the React frontend:

```bash
cd frontend
npm run dev
```

In another terminal, start the CodeIgniter backend:

```bash
cd backend
php spark serve
```

The frontend and backend run separately and communicate through the backend API.

## Project Structure

```text
/
├── frontend/       # React application
└── backend/        # CodeIgniter 4 API
```

## Live Demo

The deployed version of the project is available here:

https://meeting-scheduling-platform.wiktor-markowski362.workers.dev/

## License

This project is licensed under the MIT License.
