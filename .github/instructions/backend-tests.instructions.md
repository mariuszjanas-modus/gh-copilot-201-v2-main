---
applyTo: "users-api/**/*.test.ts"
---

# Custom Instructions: Automated Testing for users-api

When generating or editing test files for the users-api backend, always follow these rules:

- Use **Jest** with **TypeScript** support via `ts-jest`.
- Use **Supertest** for HTTP integration tests.
- Organize tests with `describe` and `it` blocks for clarity.
- Always include:
  - A test that verifies the `/api/users` endpoint returns the correct number of users.
  - A test that checks returned users match the expected TypeScript interface.
  - Tests for error handling and correct HTTP status codes.
- Implement both **unit tests** and **integration tests**.
- Make sure to have all tests pass before finalizing any changes.
- Solve any issues with test coverage or failures before completing the task.
