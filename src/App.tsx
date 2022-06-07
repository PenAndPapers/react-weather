import { useEffect, useState } from 'react'
import './App.css'
import fetchData from './utils/fetch'
import { WeatherModel } from './model/Weather'


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
  const [city, setCity] = useState('New York')
  const [timer, setTimer] = useState(0)
  const [bgImage, setBgImage] = useState(weatherType.sunny.className)

  const handleFetchWeather = async () => {
    const data: WeatherModel = await fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
    if (data.name) {
      setWeather(data)
      const currentWeather = data.weather[0].main

      if (currentWeather === weatherType.sunny.definition) return setBgImage(weatherType.sunny.className)
      if (currentWeather === weatherType.rainy.definition) return setBgImage(weatherType.rainy.className)
      if (currentWeather === weatherType.cloudy.definition) return setBgImage(weatherType.cloudy.className)
    }
  }
  
  const handleSetCity = (e) => {
    setCity(() => e.target.value)
  }

  const handleSearch = () => {
    if(timer) clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        handleFetchWeather()
      }, 2000)
    )
  }

  // fires on city updates
  useEffect(() => {
    if (city) handleSearch()
  }, [city])

  // fires on page load
  useEffect(() => {
    handleFetchWeather()
  }, [])

  return (
    <div className={`App bg-image ${bgImage}`}>
      <div className="container">
        { weather && <p className='city'>{weather.name}, {weather.sys.country}</p> }
        { weather && <h3 className='temperature'>{weather.main.temp}&#176;</h3> }
        <div className="search">
          <input type="text" value={city} placeholder="Search city..." autoFocus onChange={handleSetCity} />
        </div>
        { weather && <div className="weather-details">
          <div className="">
            <h5>Humidity</h5>
            <p>{weather.main.humidity}%</p>
          </div>
          <div className="">
            <h5>Pressure</h5>
            <p>{weather.main.pressure}</p>
          </div>
          <div className="">
            <h5>Feels like</h5>
            <p>{weather.main.feels_like}&#176;</p>
          </div>
          <div className="">
            <h5>Wind</h5>
            <p>{weather.wind.speed} km/h</p>
          </div>
          <div className="">
            <h5>Visibility</h5>
            <p>{weather.visibility * .001}km</p>
          </div>
          <div className="">
            <h5>Description</h5>
            <p>{weather.weather[0].description}</p>
          </div>
        </div> }
      </div>
    </div>
  )
}

export default App
