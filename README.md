# 🌦 Weather Forecast App

A beautifully designed React-based weather app that shows:

- Current weather
- 7-day forecast
- Trends and analytics (temperature, humidity, precipitation)

This is a mock-based weather dashboard for demo/testing purposes and **does not use a real weather API**.

---

## 🚀 Features

- 🌤 Live city search with mock data generation
- 📆 7-Day forecast cards
- 📈 Weather analytics using **Recharts**
- 💅 Styled using **Tailwind CSS**
- 🖼 Icons from **Lucide React**
- 📱 Fully responsive design

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Recharts](https://recharts.org/)

---

## 📦 Folder Structure


---

## 🧪 Notes

- This app **generates mock weather data** to simulate weather APIs.
- You can extend it by plugging in a real API like OpenWeatherMap.

---

## 📋 License

This project is for educational and demo purposes.
# 🛠 How to Run the Weather Forecast App

## 📌 Prerequisites

- Node.js v18+ installed
- npm (comes with Node)
- Internet connection

---

## 🧭 Step-by-Step Setup (Mac M1 or Intel)

### 1. Install Homebrew (skip if already installed)
Open your Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
node -v
npm -v
🧭 Step-by-Step Setup (Windows)

1. Install Node.js
Download the Windows installer from: https://nodejs.org
Follow the prompts, ensure npm is selected.
2. Verify installation in terminal or PowerShell:
node -v
npm -v
🚀 Create and Run the Project

1. Clone or copy the project folder
If using a ZIP:

unzip weather-forecast-app.zip
cd weather-forecast-app
2. Install all dependencies
npm install
3. Run the development server
npm run dev
You’ll see a message like:

Local: http://localhost:5173/
Open this in your browser 🚀

🧹 Troubleshooting

If you see a permissions error, try:
sudo npm install
If Tailwind classes don’t work, make sure:
tailwind.config.js has correct content paths
@tailwind base; @tailwind components; @tailwind utilities; are in index.css
📁 Vite Dev Server Commands

Command	Purpose
npm install	Install dependencies
npm run dev	Start development server
npm run build	Build app for production
npm run preview	Preview production build
