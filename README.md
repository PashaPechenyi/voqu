# Voqu - English Learning Platform

A self-paced English learning platform with structured progression through levels (A1-C2) and lessons.

## Tech Stack

- **Frontend:** React 18 + Vite + Material UI
- **Backend:** NestJS + TypeORM
- **Database:** PostgreSQL
- **Auth:** Auth0

## Prerequisites

- Node.js >= 20.0.0
- Docker & Docker Compose
- npm

### Installing Prerequisites

#### Node.js & npm

Check your current version:

```bash
node --version
npm --version
```

**macOS (using Homebrew):**

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node@20

# Or update existing installation
brew upgrade node
```

**macOS/Linux (using nvm - recommended):**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Restart terminal, then install Node.js
nvm install 20
nvm use 20
nvm alias default 20
```

**Windows:**

1. Download the installer from https://nodejs.org/ (LTS version 20.x)
2. Run the installer and follow the prompts
3. Restart your terminal

#### Docker & Docker Compose

**macOS:**

```bash
# Using Homebrew
brew install --cask docker

# Start Docker Desktop from Applications
```

Or download Docker Desktop from https://www.docker.com/products/docker-desktop/

**Linux (Ubuntu/Debian):**

```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install docker.io docker-compose-v2

# Add your user to docker group (logout/login required)
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

**Windows:**

1. Download Docker Desktop from https://www.docker.com/products/docker-desktop/
2. Run the installer (WSL 2 backend recommended)
3. Restart your computer when prompted

Verify installation:

```bash
docker --version
docker compose version
```

## Project Setup

### 1. Clone and Install Dependencies

```bash
git clone <repo-url>
cd voqu
npm install
```

### 2. Environment Configuration

Copy the example environment files:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

Update the `.env` files with your configuration:

**apps/web/.env:**

```
VITE_API_URL=http://localhost:3001
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://api.voqu.com
```

**apps/api/.env:**

```
DATABASE_URL=postgresql://voqu:voqu_password@localhost:5432/voqu
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.voqu.com
CORS_ORIGIN=http://localhost:5173
PORT=3001
NODE_ENV=development
```

### 3. Start PostgreSQL

```bash
docker-compose up -d
```

### 4. Run Database Migrations

```bash
cd apps/api
npm run migration:run
```

## Running the Application

### Development Mode

Run both frontend and backend:

```bash
# Terminal 1 - Frontend (http://localhost:5173)
npm run dev:web

# Terminal 2 - Backend (http://localhost:3001)
npm run dev:api
```

Or run all workspaces:

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

## Project Structure

```
voqu/
├── apps/
│   ├── web/                 # React frontend
│   │   └── src/
│   │       ├── components/  # Reusable UI components
│   │       ├── pages/       # Page components
│   │       ├── hooks/       # Custom React hooks
│   │       ├── services/    # API client services
│   │       ├── store/       # State management
│   │       ├── theme/       # MUI theme
│   │       └── routes/      # Route definitions
│   │
│   └── api/                 # NestJS backend
│       └── src/
│           ├── modules/     # Feature modules
│           ├── common/      # Shared utilities
│           ├── config/      # Configuration
│           └── database/    # TypeORM entities & migrations
│
├── packages/
│   └── shared/              # Shared types & constants
│
└── docker-compose.yml       # PostgreSQL container
```

## Available Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Run all workspaces in dev mode |
| `npm run dev:web` | Run frontend only              |
| `npm run dev:api` | Run backend only               |
| `npm run build`   | Build all workspaces           |
| `npm run lint`    | Lint all workspaces            |
| `npm run format`  | Format code with Prettier      |

## License

Private
