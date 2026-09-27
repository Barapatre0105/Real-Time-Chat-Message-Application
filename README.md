# Real-Time Chat Application

A real-time chat application built with **React (Vite)** on the frontend and **Node.js, Express, Socket.io, and SQLite** on the backend. This project features a modern "Glassmorphism" UI design, real-time messaging, typing indicators, and user online status.

## Project Setup Instructions

1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone or download this repository.
3. Open two separate terminal windows: one for the backend and one for the frontend.

---

## Steps to run the backend

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. The `.env` file should already be set up with default values.
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will start running on `http://localhost:5000`.*

---

## Steps to run the frontend

1. Open a second terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. The `.env` file should already be set up with default values.
4. Start the Vite frontend server:
   ```bash
   npm run dev
   ```
   *The application will be accessible at `http://localhost:5173`.*

---

## Environment Variables Required

### Backend (`backend/.env`)
| Variable | Description | Default Value |
|----------|-------------|---------------|
| `PORT` | The port the backend server runs on | `5000` |
| `DB_PATH` | Path to the SQLite database file | `./chat.db` |
| `CLIENT_ORIGIN` | Allowed URL for CORS | `http://localhost:5173` |

### Frontend (`frontend/.env`)
| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_URL` | REST API URL for fetching chat history | `http://localhost:5000/api/messages` |
| `VITE_SOCKET_URL` | Socket.io server connection URL | `http://localhost:5000` |

---

## Design Decisions

1. **Tech Stack Selection**: 
   - **Frontend**: React with Vite for fast local development and hot module replacement.
   - **Backend**: Node.js with Express for lightweight API routing, and `Socket.io` for robust, bi-directional real-time event broadcasting.
2. **Database (SQLite)**: 
   - `better-sqlite3` was chosen for local persistence. It requires zero configuration, no separate database servers to install, and works right out of the box with the codebase, making it perfectly portable.
3. **UI / UX Architecture**:
   - A modern **Glassmorphism** design was chosen to give the app a sleek, premium feel. Backgrounds are blurred, borders are frosted, and gradients are applied to emphasize active elements.
   - State management is handled with React's `useState` and `useEffect` hooks, connecting tightly to Socket.io event listeners.

## Assumptions Made

- **Single Global Room**: It is assumed that all users joining the application participate in a single, global chat room. Private messaging or separate channels were intentionally excluded to maintain a simple, focused feature set.
- **Dummy Authentication**: It is assumed that password-based security is not required. A username stored in `localStorage` acts as a session token.

---

## Bonus Features Implemented

✅ **Username-based login (dummy authentication):** Users are prompted for a username upon entering, which is saved locally to maintain identity across reloads.
✅ **Typing indicator:** Users can see when another participant is actively typing a message (`User is typing...`).
✅ **Online/offline user status:** The header dynamically displays the count of currently connected users in real-time.
✅ **Store messages in SQLite:** Full chat history is persisted to `chat.db` and hydrates the chat UI immediately when a user refreshes or reconnects.
❌ **Message read/delivered status:** Not implemented in this version.
❌ **Deployment:** Intended for local execution and review.

---
