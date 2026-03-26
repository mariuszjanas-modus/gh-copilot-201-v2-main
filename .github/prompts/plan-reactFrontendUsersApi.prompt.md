# Plan: React.js Frontend for Users API

## TL;DR
Create a TypeScript React frontend using Vite that fetches and displays user data from the backend API (http://localhost:3000/api/users). The app will have modular architecture with separate directories for components, types, and services, featuring a responsive users table with loading/error states and modern CSS styling.

## Backend Context
- **User Interface**: `{ id: number; name: string; username: string; email: string; role: string; }`
- **API Endpoint**: `GET /api/users` returns JSON array of users
- **Sample roles**: admin, user, moderator

---

## Steps

### Phase 1: Project Setup
1. Initialize Vite React + TypeScript project in `users-frontend` directory
   - Command: `npm create vite@latest users-frontend -- --template react-ts`
2. Install dependencies: `axios`, `react-router-dom`
3. Configure Vite to run on port 3001 in `vite.config.ts`

### Phase 2: Folder Structure
4. Create modular folder structure:
   ```
   users-frontend/src/
   ├── components/
   │   ├── common/         # Reusable UI components
   │   │   ├── Loading.tsx
   │   │   └── ErrorMessage.tsx
   │   ├── users/
   │   │   └── UsersTable.tsx
   │   └── layout/
   │       ├── Header.tsx
   │       └── Navigation.tsx
   ├── pages/
   │   ├── HomePage.tsx
   │   └── UsersPage.tsx
   ├── services/
   │   └── userService.ts  # Axios API calls
   ├── types/
   │   └── User.ts         # User interface
   └── styles/
       └── global.css      # Modern CSS styling
   ```

### Phase 3: Type Definitions
5. Define User interface in `src/types/User.ts` matching backend structure:
   - `id: number`
   - `name: string`
   - `username: string`
   - `email: string`
   - `role: string`

### Phase 4: API Service Layer
6. Create `userService.ts` with axios:
   - Configure base URL: `http://localhost:3000`
   - Implement `getAllUsers()` function with proper error handling
   - Return typed `User[]` response

### Phase 5: Reusable Components
7. Create `Loading.tsx` component with spinner/animation
8. Create `ErrorMessage.tsx` component with retry capability
9. Create `Header.tsx` with app title and dark/light mode toggle
10. Create `Navigation.tsx` with links to Home and Users pages

### Phase 6: Feature Components
11. Create `UsersTable.tsx`:
    - Full-width responsive table (100% width)
    - Columns: ID, Name, Username, Email, Role
    - Role badges with color coding (admin=red, moderator=yellow, user=blue)
    - Hover effects on rows

### Phase 7: Pages & Routing
12. Create `HomePage.tsx` with welcome message and navigation to Users
13. Create `UsersPage.tsx`:
    - Use `useState` for users, loading, error states
    - Use `useEffect` to fetch users on mount
    - Conditionally render Loading/Error/UsersTable
14. Configure React Router in `App.tsx`:
    - Route `/` → HomePage
    - Route `/users` → UsersPage

### Phase 8: Styling
15. Implement modern CSS in `global.css`:
    - CSS variables for theming (light/dark mode)
    - Modern table styling with alternating row colors
    - Responsive design with media queries
    - Smooth transitions and hover effects
    - Clean typography with system fonts
16. Add dark/light mode toggle functionality using React state + CSS variables

### Phase 9: Final Integration
17. Update `main.tsx` to wrap App with BrowserRouter
18. Clean up default Vite boilerplate files

---

## Relevant Files

**To Create:**
- `users-frontend/vite.config.ts` — Configure port 3001
- `users-frontend/src/types/User.ts` — User interface definition
- `users-frontend/src/services/userService.ts` — Axios API service with `getAllUsers()`
- `users-frontend/src/components/common/Loading.tsx` — Loading spinner component
- `users-frontend/src/components/common/ErrorMessage.tsx` — Error display with retry
- `users-frontend/src/components/users/UsersTable.tsx` — Full-width users table
- `users-frontend/src/components/layout/Header.tsx` — App header with theme toggle
- `users-frontend/src/components/layout/Navigation.tsx` — Nav links
- `users-frontend/src/pages/HomePage.tsx` — Landing page
- `users-frontend/src/pages/UsersPage.tsx` — Users list page with loading/error states
- `users-frontend/src/styles/global.css` — Modern responsive CSS
- `users-frontend/src/App.tsx` — Router configuration

**Reference (Backend):**
- `users-api/src/types/User.ts` — Source of truth for User interface
- `users-api/data/users.json` — Sample data for testing

---

## Verification

1. **Build check**: Run `npm run build` in users-frontend — should complete without errors
2. **Type check**: Run `npx tsc --noEmit` — no TypeScript errors
3. **Dev server**: Run `npm run dev` — should start on http://localhost:3001
4. **API integration**: With backend running on port 3000, navigate to `/users` — should display 10 users
5. **Error handling**: Stop backend, refresh Users page — should show error message with retry button
6. **Responsiveness**: Test at mobile (375px), tablet (768px), desktop (1200px) breakpoints
7. **Theme toggle**: Click dark/light mode toggle — UI should switch themes smoothly

---

## Decisions

- **Vite over CRA**: Per instructions, using Vite for faster builds and modern tooling
- **Axios over fetch**: Per instructions, using axios for cleaner API syntax and interceptors
- **CSS over styled-components**: Using vanilla CSS with variables for simplicity and per project guidelines
- **Folder structure**: Organized by feature (users/) and type (common/, layout/) for scalability
- **Table width**: 100% width per instructions, not centered narrow container
