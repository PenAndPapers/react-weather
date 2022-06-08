import { WeatherModel } from "../model/Weather"

interface ComponentProps {
  weather: WeatherModel
}

const WeatherDetails = (props: ComponentProps) => {
  return (
    <div className="weather-details">
      <div className="">
        <h5>Humidity</h5>
        <p>{props.weather.main.humidity}%</p>
      </div>
      <div className="">
        <h5>Pressure</h5>
        <p>{props.weather.main.pressure}</p>
      </div>
      <div className="">
        <h5>Feels like</h5>
        <p>{props.weather.main.feels_like}&#176;</p>
      </div>
      <div className="">
        <h5>Wind</h5>
        <p>{props.weather.wind.speed} km/h</p>
      </div>
      <div className="">
        <h5>Visibility</h5>
        <p>{props.weather.visibility * .001}km</p>
      </div>
      <div className="">
        <h5>Description</h5>
        <p>{props.weather.weather[0].description}</p>
      </div>
    </div>
  )
}

export default WeatherDetails