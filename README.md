**Motivation**: It is a learning project which has helped me in understanding the core concepts of React 19 along with basics of Next.js and the uses of map libaries like leaflet.js

# Weather Now

**Weather Now** is a modern weather **Single Page Application (SPA)** built using **Next.js**, **React**, and **TypeScript**. It provides real-time weather data and maps for various locations using the OpenWeather API, Overpass API and Leaflet.js.

## Features

- 🌦 Real-time Weather Data – Get the latest temperature, wind speed, and rainfall data.
- 🗺 Interactive Maps – View weather layers with Leaflet.js.
- 📍 Search Locations – Find weather data for any city.
- 🌙 Dark Mode – Switch between light and dark themes.
- ⚡ Fast & Responsive – Optimized with Next.js and media queries for seamless performance.

## Tech Stack

- **Frontend**: Next.js (v15), React (v19), TypeScript
- **UI**: CSS Modules (with Theme Support)
- **Maps & Data**: Leaflet.js, OpenWeather API, Overpass API
- **State Management**: React Context API

## Installation / Setup
> Make sure you have Node.js and npm/yarn installed.

1. Clone the Repository
```
git clone https://github.com/ayuzzz/weather-now.git
cd weather-now
```
2. Install Dependencies
```
npm install
or
yarn install
```
3. Run the Development Server
```
npm run dev
or
yarn dev
```
4. Open http://localhost:3000 in your browser.

## Walkthrough
Weather Now is a weather forecasting application which provides detailed weather forecast details as follows:
- Current Weather conditions, Temperature trend (24-hours), Hourly weather forecasts, Weekly weather forecasts
  
![Dashboard-light](https://github.com/user-attachments/assets/7da8e45d-c52d-4dc4-9285-8608db842dba)
![Dashboard-dark](https://github.com/user-attachments/assets/75da9cf7-fb9f-44d9-96d9-a7966c3137b0)
![Dashboard-small-dark](https://github.com/user-attachments/assets/6ebb8441-e520-4e73-83b2-0263d0f40e78)
![Screenshot (145)](https://github.com/user-attachments/assets/65698290-c6fb-40b0-a76f-e9871adc5e35)


- Weather details for top cities cities in that country in as a map
The maps adapt to the screen size and also have 3 layers to display some or all weather parameters like Temperature, Rainfall and Windspeed

![Maps-light](https://github.com/user-attachments/assets/0bef4708-e945-4b8e-871b-7eafe04af38a)
![Maps-dark](https://github.com/user-attachments/assets/c8b3dc0e-10f5-4268-a794-16c828b4b07c)
![Screenshot (146)](https://github.com/user-attachments/assets/865c7c9d-fdfd-41b8-a5a2-8c9f1a0fc9d0)
![Maps-small-dark](https://github.com/user-attachments/assets/6e3f68aa-e49a-4389-81d6-27cacbf5d278)


- Settings Page
Units can be configured from this screen for all weather parameters

![Settings-light](https://github.com/user-attachments/assets/82927e27-5939-4018-8b62-321482f62029)
![Settings-dark](https://github.com/user-attachments/assets/ab2bac1e-dcb8-4c92-985d-e3c25021a615)



