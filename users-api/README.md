# Users API

Backend API for user management built with Express.js and TypeScript.

## Features

- RESTful API endpoint for retrieving user data
- TypeScript for type safety
- CORS enabled for frontend integration
- Modular architecture with separate layers for types, services, controllers, and routes

## Project Structure

```
users-api/
├── src/
│   ├── types/          # TypeScript type definitions
│   │   └── User.ts
│   ├── services/       # Business logic
│   │   └── UserService.ts
│   ├── controllers/    # Request handlers
│   │   └── UserController.ts
│   ├── routes/         # Route definitions
│   │   └── userRoutes.ts
│   ├── app.ts          # Express app configuration
│   └── index.ts        # Application entry point
├── data/
│   └── users.json      # Static user data
├── package.json
├── tsconfig.json
└── .gitignore
```

## Prerequisites

- Node.js (v18 or higher)
- npm

## Installation

1. Navigate to the users-api directory:
```bash
cd /Users/mariuszjanas/Desktop/Training/CP201/260326/_code/gh-copilot-201-v2-main/users-api
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**: Array of user objects

#### Example Response:
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "username": "alicej",
    "email": "alice.johnson@example.com",
    "role": "admin"
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "username": "bobsmith",
    "email": "bob.smith@example.com",
    "role": "user"
  }
]
```

## Testing the API

Using curl:
```bash
curl http://localhost:3000/api/users
```

Using a browser:
```
http://localhost:3000/api/users
```

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3001` (frontend application)

## Technologies Used

- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **CORS**: Cross-Origin Resource Sharing middleware
- **ts-node-dev**: TypeScript execution with hot reloading

## Scripts

- `npm run dev`: Start development server with auto-reload
- `npm start`: Start production server
- `npm run build`: Compile TypeScript to JavaScript
- `npm test`: Run tests (not yet implemented)

## License

ISC
