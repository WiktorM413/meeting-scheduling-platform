# Meeting Scheduling Platform

A web application for scheduling and managing meetings with other users. You can find people on the platform, view their profiles, and arrange a meeting by choosing a topic, location, date, and time.

## Features

* Create and schedule meetings
* View upcoming and previous meetings
* Browse other users' profiles
* Search for users
* Set a meeting topic, location, and time

## Tech Stack

* **Frontend:** React
* **Backend:** CodeIgniter 4

## Getting Started

### Requirements

You will need the following installed:

* Node.js / npm
* PHP
* Composer
* A local web server and MySQL database

The project was developed using XAMPP for the local server and database.

### Installation

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Then install the backend dependencies:

```bash
cd ../backend
composer install
```

### Database Configuration

An example environment file is included at:

```text
backend/env_example
```

The example is configured for a XAMPP setup. Copy or rename it as needed and change the values to match your local environment.

The default database name is:

```text
msp
```

Make sure the database exists before starting the application.

### Running the Application

Start the React development server:

```bash
cd frontend
npm run dev
```

In a separate terminal, start the CodeIgniter server:

```bash
cd backend
php spark serve
```

The frontend and backend will then run as separate development servers.

## Project Structure

```text
/
├── frontend/       # React frontend
└── backend/        # CodeIgniter 4 API
```

## Live Demo

A deployed version of the project is available here:

https://meeting-scheduling-platform.wiktor-markowski362.workers.dev/

## License

MIT License.
