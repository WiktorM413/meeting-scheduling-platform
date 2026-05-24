# 📅 Meeting Scheduling Platform

A web platform for creating and managing meetings with others. Browse user profiles, search for people, and schedule meetings with a defined topic, place, and time - all in one place

---

## Features

- **Create Meetings** - Schedule a meeting with a topic, location, and time
- **View Meetings** - See all your upcoming and past meetings at a glance
- **User Profiles** - View other users' profiles and their public information
- **Search** - Find users quickly by searching the platform

---

## Tech Stack

| Layer     | Technology     |
|-----------|----------------|
| Frontend  | React          |
| Backend   | CodeIgniter 4  |

---

## Getting started


### Prerequisites

- **npm**
- **PHP**
- **Composer**
- **Server(XAMPP used in setup example)**

### Installation

```bash
	cd frontend
	npm install
	cd ..
	cd backend
	composer install
```

### Environment variables

As mentioned earlier, the example .env file is for XAMPP.
It's located in: ` backend/env_example `
Modify the file to your liking.
The default database name is msp

### Running the App

Execute the following commands to run the app:

- In one terminal
```bash
	cd frontend
	npm run dev
```

- In another terminal
```bash
	cd backend
	php spark serve
```

### Project Structure

```
/
├── frontend/       # React application
└── backend/        # CodeIgniter 4 API
```

---

## License
MIT License