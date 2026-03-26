<img alt="Node.js" src="https://img.shields.io/badge/Node.js-brightgreen" target="_blank"> <img alt="Express.js" src="https://img.shields.io/badge/Express.js-brightgreen" target="_blank"> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-brightgreen" target="_blank"> <img alt="React" src="https://img.shields.io/badge/React-brightgreen" target="_blank">

---

### Overview

This repo is split into a backend application and a frontend application. The backend is an Express.js API that serves user data, while the frontend is a React.js application that consumes this API and displays the data in a user-friendly format.

The **users-api** is a directory that contains the backend application, and the **users-frontend** is a directory that contains the frontend application.

> ⚠️ **Note:** The **users-api** and **users-frontend** directories do not exist yet. You will create them as you progress through the module instructions below.

### Requirements

- **Node.js**: Ensure you have Node.js installed on your machine.
- **TypeScript**: The backend and frontend applications are built using TypeScript.
- **Express.js**: The backend uses Express.js to create a RESTful API.
- **React.js**: The frontend is built using React.js.

---

### Module 1 - Custom Instructions

Reference: https://code.visualstudio.com/docs/copilot/copilot-customization

To demonstrate how custom instructions work, create a file named `.github/instructions/variable-names.instructions.md` in the root directory of this repository. This file will contain custom instructions to enforce the use of **camelCase** for variable names.

```markdown
---
applyTo: "*.ts"
---

# Variable Names Rules

Apply this rule to all TypeScript files in this repository:

- Make sure to use camelCase for variable names.
- Enforce to use camelCase for variable names when creating new variables, changing existing variables, or refactoring code.
```

Prompt the following in GitHub Copilot Ask Mode:

```

create a todo list into my server.ts

```

After reviewing the results and confirming that the generated variable names follow **camelCase**, update the `.github/instructions/variable-names.instructions.md` file to enforce **snake_case** instead. Then, run the same prompt again to verify that Copilot now uses **snake_case** variable names—demonstrating the effect of custom instructions.

**Custom Instructions for Copilot Instructions**

To use the main instruction file, `.github/copilot-instructions.md`, create it by copying the content from `copilot-instructions.template.md` into that location.

This file acts as the primary instruction for Copilot and can reference other Markdown files in the **.github** folder to organize your custom instructions modularly.

**Custom Prompts**

To enable the **custom prompts**, create the file `.github/prompts/nodejs-version.prompt.md` using the content from `nodejs-version.template.md`.

Then, in Copilot Agent Mode, trigger the prompt by entering:

```

/nodejs-version

```

Explain how it works and how can be disable/enable the tools in line 3!

---

### Module 2 - create a backend API application

To generate the backend application using GitHub Copilot Agent Mode, first load the following instruction files:

- `.github/instructions/root-path.instructions.md`
- `.github/instructions/backend-application.instructions.md`
- `.github/instructions/backend-structure.instructions.md`

Once these files are loaded, run the following prompt in Copilot Agent Mode to scaffold the backend:

```

Create a backend API application using Express.js and TypeScript. Use ts-node-dev to run the app. Implement a route at /api/users that responds with a JSON array of 10 fake users. Each user should have the following fields: id, name, username, email, and role. Organize the project using TypeScript best practices, including type definitions and modular structure. Use CORS middleware to allow requests from http://localhost:3001.

```

---

#### Getting Help

🚨 **Note:** If you run into issues during setup or development, first double-check the instructions and make sure all required files are properly loaded in Copilot Agent Mode. If Copilot isn’t responding as expected, try rephrasing your request or adding more context. For ongoing issues, don’t hesitate to reach out to the team for support.

---

### Module 3 - create a frontend application

To generate the frontend application using GitHub Copilot Agent Mode, first load the following instruction files:

- `.github/instructions/root-path.instructions.md`
- `.github/instructions/frontend-application.instructions.md`

Once these files are loaded, run the following prompt in Copilot Agent Mode to scaffold the frontend application:

```

Create a React.js frontend application using TypeScript that runs on port 3001 and fetches user data from http://localhost:3000/api/users. Define a User interface that reflects the backend data structure, and organize the project with a modular folder structure, including separate directories for components and types. Ensure the application includes proper error handling and loading states to deliver a smooth and reliable user experience. Use beautiful and modern CSS for styling to create a clean, responsive, and modern UI.

```

---

### Module 4 - Implementing Automated Test Coverage

Once the backend and frontend applications are created, set up comprehensive testing for the **users-api** backend using **Jest** and **Supertest**.

To generate the backend tests using GitHub Copilot Agent Mode, first load the following instruction files:

- `.github/instructions/backend-tests.instructions.md`

Use this prompt in GitHub Copilot Agent Mode to generate the entire testing setup:

```

Create a comprehensive testing setup for the users-api backend application using Jest and Supertest. Implement the following:

1. Configure Jest with TypeScript support using ts-jest
2. Create test files for the existing API endpoints in the users-api
3. Write tests that verify:
   - The users endpoint returns the correct number of users
   - The returned users match the expected interface
   - Error handling works properly
   - HTTP status codes are correct

Include proper test organization with describe/it blocks and implement both unit tests and integration tests. Make sure the tests follow best practices like proper setup and teardown. Update the package.json with appropriate test scripts.

```

---

### Module 5 - Implementing a new feature 💡

Here we're going to implement a new feature that allows users to view detailed information about each user in the frontend application. This will involve the following changes.

```
Create a user profile details page for my user management application. The page should:

- Display when a user is clicked in the main users table
- Show detailed information about the selected user
- Have a clean, consistent design with the rest of the application
- Include a way to navigate back to the users list
- Be accessible via a route like `/users/:userId`

### Backend

Extend the Express backend API to add a new endpoint for fetching individual user details. I need:

- A new route at `/api/users/:userId` that returns detailed information for a specific user
- Additional user details beyond what's shown in the list (e.g., address, phone, company, bio)
- Proper error handling if a user ID doesn't exist
- TypeScript interfaces for the new data structures
- Unit tests for the new endpoint

### Frontend

Create a UserProfile React component that displays detailed user information. The component should:

- Use React Router to get the userId parameter from the URL
- Fetch user details from the API endpoint we created
- Show a loading state while data is being fetched
- Display an error message if the user doesn't exist
- Show the user's profile picture prominently
- Organize information in a visually appealing card layout
- Include TypeScript interfaces for props and state

### Navigation

Implement navigation between the users list and the new profile details page:

- Make each row in the users table clickable to navigate to the profile page
- Add a back button on the profile page to return to the users list
- Update the React Router configuration to support the new route
- Ensure the browser history works correctly (back/forward navigation)

### Do not create any tests for the frontend applications at this stage.

- Focus only on implementing the user profile details feature.
- Ignore any requirements to generate test files, or test cases for the frontend app.
- Testing will be addressed later on.

### Update any unit, integration, or end-to-end tests for the backend application at this stage.

- Make sure to update the tests in the backend application accordingly to the changes made.
- Do not ignore the requirements to update test files, or test cases for the backend.

### React fragment

- Make sure to use React fragment in the `users-frontend/src/App.tsx` file.
- Do not use Router componenet to embrace the entire application. Use the React fragment instead.

```

### Module 6 - Security Improvements 🔒

In Copilot Ask Mode, execute this prompt:

```

@workspace can you read the entire users-api and see code smells? or any potential security risks?

```

1. **Hardcoded CORS Origin:** If it says "In **src/app.ts**, the CORS origin is hardcoded to **http://localhost:3001**. This is fine for development, but for production, it should be configurable via environment variables.", accept the suggestion and implement it. Go to this file and play with Copilot to implement it.

2. **Static Data Source:** If it says "The API serves users from a static JSON file (**data/users.json**). This is acceptable for a demo, but not scalable for real applications.", don't worry, as this is a demo application.

3. **No Error Handling Middleware:** If it says "The Express app lacks centralized error handling middleware. Adding this would improve maintainability and security by ensuring consistent error responses.", accept the suggestion and implement it. Go to **src/app.ts** and play with Copilot to implement it.

4. **No Authentication or Authorization:** If it says "The API does not implement any authentication or authorization mechanisms. This is a significant security risk, as it allows any user to access any endpoint without restriction.", don't worry, as this is a demo application.

5. **No Rate Limiting:** If it says "The API does not implement any rate limiting. This could expose the application to abuse or denial-of-service attacks.", accept the suggestion and implement it.

---

💡 Add MySQL Database Integration - Imagine that a Software Engineer is implementing this resource, and he or she doesn't have too much experience with MySQL.

Create a file named `users-api/src/models/userModel.ts` with the following content:

```typescript
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "supersecretpassword",
  database: "users_db",
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 0,
});

export async function getAllUsers(): Promise<any[]> {
  const query =
    "SELECT id, name, username, email, role FROM users WHERE name LIKE '" +
    (process.env.SEARCH || "") +
    "%'";
  const [rows] = await pool.query(query);
  return rows;
}
```

**Note:** Don't need to install the MySQL library because this is for demonstration purposes only. But if typescript complains about missing types, you can install them with: `cd ~/ModusCreate/gh-copilot-201-v2/users-api && npm install mysql2`

Go to Copilot Ask Mode and run the following prompt:

```

#file:userModels.ts is there any code smell in this code?

```

---

### Module Extra - New Features: Search Functionality 🔍 and Sorting Functionality 🔀

For the search functionality, in Copilot Agent Mode, execute this prompt:

```

In the users-frontend application, add a search input above the headers that filters the list by name, username, or email. The search should be case-insensitive and update the displayed rows dynamically as I type.

```

For the sorting functionality, in Copilot Agent Mode, execute this prompt:

```

In the users-frontend application, add sorting functionality to the list by making each column header clickable. When a header is clicked, the list should be sorted by that column (e.g., id, name, username, email, role). Sorting should toggle between ascending and descending order.

```
