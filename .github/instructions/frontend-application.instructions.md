---
applyTo: "users-frontend/**"
---

# Frontend Application - React.js

- Create a directory called users-frontend and navigate into it. Initialize a new React.js project with TypeScript that runs on port 3001 and fetches user data from `http://localhost:3000/api/users`. Install the necessary dependencies, including axios for making HTTP requests and react-router-dom for routing.

- Implement a simple user interface that fetches the list of users from the backend API and displays them in a table. Each row should include the user's ID, name, username, email, and role.

- Use React Router to set up a basic routing structure, allowing navigation between different pages (e.g., Home, Users).

- Use axios to make HTTP requests to the backend API and display the data in the frontend application.

- Implement error handling for API requests and display appropriate messages to the user.

- Use React hooks (useState, useEffect) to manage state and lifecycle methods.

- Organize the project using best practices, including component structure and separation of concerns.

- Use beautiful and modern CSS for styling to create a clean, responsive, and modern UI.

- Ensure the users table spans the full available width of the page, use 100% width, instead of being centered in a narrow container.

- Make sure to use vite as the build tool for the React application. Default command when creating the app `npm create vite@latest users-frontend -- --template react-ts`.
