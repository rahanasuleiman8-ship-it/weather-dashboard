# Weather Dashboard

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?style=flat)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=flat)

A responsive weather application that displays current weather and forecasts using the OpenWeatherMap API. Features location-based weather data and beautiful visualizations.

## 🌟 Features

- **Current Weather** - Real-time weather for any city
- **5-Day Forecast** - Extended weather forecast
- **Geolocation** - Auto-detect user location
- **Data Visualization** - Temperature and humidity charts
- **Responsive Design** - Works on all devices
- **Weather Icons** - Dynamic icons based on conditions

## 🛠️ Tech Stack

- **React 18** - UI library
- **Chart.js** - Data visualization
- **OpenWeatherMap API** - Weather data
- **Geolocation API** - User location
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.tsx
│   │   ├── Forecast.tsx
│   │   ├── SearchBar.tsx
│   │   ├── WeatherChart.tsx
│   │   └── WeatherIcon.tsx
│   ├── hooks/
│   │   └── useWeather.ts
│   ├── services/
│   │   └── weatherApi.ts
│   └── types/
│       └── weather.ts
├── public/
└── README.md
```

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/rahanasuleiman8-ship-it/weather-dashboard.git

# Install dependencies
cd weather-dashboard
npm install

# Add your API key in .env
REACT_APP_API_KEY=your_openweathermap_api_key

# Start development server
npm start
```

## 🔑 API Key

This project uses the OpenWeatherMap API. Get your free API key at:
https://openweathermap.org/api

## 📸 Features Preview

### Current Weather Display
- Temperature (feels like)
- Weather conditions with icon
- Humidity, wind speed, pressure
- Sunrise/sunset times

### 5-Day Forecast
- Daily forecast cards
- Temperature range
- Weather conditions

### Charts
- Temperature trend (24 hours)
- Humidity levels

## 🧪 API Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `/weather` | Current weather data |
| `/forecast` | 5-day forecast |
| `/onecall` | Comprehensive weather data |

## 📈 What I Learned

- Working with REST APIs in React
- Handling async data with useEffect
- Chart.js integration
- Geolocation API usage
- Error handling for API calls

## 🔮 Future Improvements

- [ ] Weather alerts
- [ ] Multiple locations saved
- [ ] Dark mode
- [ ] PWA support
- [ ] Air quality index

## 📄 License

MIT License

## 📬 Contact

**Rahana Suleiman**
- Email: rahanasuleiman8@gmail.com
- LinkedIn: [linkedin.com/in/rahanasuleiman](https://linkedin.com/in/rahanasuleiman)
- GitHub: [github.com/rahanasuleiman8-ship-it](https://github.com/rahanasuleiman8-ship-it)

---

⭐️ If you found this project interesting, please consider giving it a star!