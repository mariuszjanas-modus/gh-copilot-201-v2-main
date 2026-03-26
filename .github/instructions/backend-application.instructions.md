---
applyTo: "users-api/**"
---

# Backend Application - Express.js

- Create a directory called users-api and navigate into it. Initialize a new Node.js project with TypeScript and install the necessary dependencies.

- Ensure all source files in users-api use the .ts extension.

- All source code must use TypeScript (`.ts` extension).

- Do not create or use `.js` files in this project.

- This backend API application should include a static `users.json` file (or a hardcoded array) with 10 fake users. Create a folder named `data` to store this file.

- Use ts-node-dev to run the app.

- Use CORS middleware to allow requests from `http://localhost:3001`.

- Implement a route at /api/users that responds with a JSON array of 10 fake users.

- Each user should have the following fields: id, name, username, email, and role.

- Organize the project using TypeScript best practices, including type definitions and modular structure.

- Do not use the 'dist' folder in this project.

- Use the .gitignore file to exclude node_modules, .env, and other unnecessary files from version control.

- Copy the template from `/Users/mariuszjanas/Desktop/Training/CP201/260326/_code/gh-copilot-201-v2-main/Node.gitignore` to `/Users/mariuszjanas/Desktop/Training/CP201/260326/_code/gh-copilot-201-v2-main/users-api/Node.gitignore`. Then rename it to `.gitignore`.
