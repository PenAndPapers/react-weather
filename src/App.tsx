import { useEffect, useState } from 'react'
import './App.css'
import fetchData from './utils/fetch'
import { WeatherModel } from './model/Weather'
import InputSearch from './components/InputSearch'
import WeatherDetails from './components/WeatherDetails'


function App() {
  const WEATHER_API_KEY = '6a910da90c54084870c2c32f95d9ac38'
  const weatherType = {
    sunny: {
      definition: 'Clear',
      className: 'sunny'
    },
    rainy: {
      definition: 'Rain',
      className: 'rainy'
    },
    cloudy: {
      definition: 'Clouds',
      className: 'cloudy'
    }
  }

  const [weather, setWeather] = useState<WeatherModel | null>(null)
  const [bgImage, setBgImage] = useState('sunny')

  const handleFetchWeather = async (city: string) => {
    const data: WeatherModel = await fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
    if (data.name) {
      setWeather(data)
      const currentWeather = data.weather[0].main

      if (currentWeather === weatherType.sunny.definition) return setBgImage(weatherType.sunny.className)
      if (currentWeather === weatherType.rainy.definition) return setBgImage(weatherType.rainy.className)
      if (currentWeather === weatherType.cloudy.definition) return setBgImage(weatherType.cloudy.className)
    }
  }

  return (
    <div className={`App bg-image ${bgImage}`}>
      <div className="container">
        { weather && <p className='city'>{weather.name}, {weather.sys.country}</p> }
        { weather && <h3 className='temperature'>{weather.main.temp}&#176;</h3> }
        <InputSearch onSearch={handleFetchWeather} />
        { weather && <WeatherDetails weather={weather} /> }
      </div>
    </div>
  )
}

export default App
