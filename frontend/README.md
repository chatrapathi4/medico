# Medico

## Prerequisites
- Node.js (v16 or higher)
- pnpm (v8 or higher)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd medico
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Running the Project

### Development Mode
To run the project in development mode:
```bash
pnpm dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Mode
1. Build the project:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting
If you encounter the error:
```
Error: Could not find a production build in the '.next' directory.
```
Make sure to run `pnpm build` before starting the production server.
