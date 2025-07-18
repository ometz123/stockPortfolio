# Stock Portfolio Setup

## Prerequisites
- Node.js (v18+)
- pnpm
- MongoDB

## Setup

1. **Clone repository**
```bash
git clone https://github.com/ometz123/stockPortfolio.git
cd stockPortfolio
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start MongoDB**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

4. **Configure environment**
```bash
cp .env.example .env
```

Update `.env`:
```env
VITE_API_KEY=<YOUR.financialmodelingprep.API_KEY>
```

5. **Start applications**
```bash
# Backend
pnpm nx serve backend

# Frontend (new terminal)
pnpm nx serve frontend
```

## Create First Portfolio

Once you open the portfolio page, 
the app will create first portfolio by the name of 
EXAMPLE_USER_NAME=John Doe.
feel free to change it in the `.env` file.


Access frontend at `http://localhost:4200`