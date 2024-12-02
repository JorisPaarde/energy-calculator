# Energy Calculator

A web-based tool for calculating energy efficiency labels for buildings.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) - recommended for version management

## Setup with nvm (recommended)

1. **Install nvm**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. **Restart your terminal or run:**
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

3. **Install and use the latest LTS version of Node.js:**
   ```bash
   nvm install --lts
   nvm use --lts
   ```

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd energy-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/energy-calculator/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure
