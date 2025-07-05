import { useState } from 'react'
import axios from 'axios';
import "./App.css";
// Image
import ClearImage from "/public/images/clear.png"
import CloudImage from "/public/images/clouds.png"
import DrizzleImage from "/public/images/drizzle.png"
import HumidityImage from "/public/images/humidity.png"
import MistImage from "/public/images/mist.png"
import RainImage from "/public/images/rain.png"
import SearchImage from "/public/images/search.png"
import SnowImage from "/public/images/snow.png"
import WindImage from "/public/images/air.png"
import DewImage from "/public/images/dewpoint.png"

const WeatherDetail = ({ icon, temp, city, country, lat, lon, humidity, wind,weatherMain }) => {
  return (
    <>
      <h1>Hai Arun</h1>
      <div className="image">
        <img src={icon} alt="clearimage" />
        
      </div>
      <div>
        <h5>{weatherMain}</h5>
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">longitude</span>
          <span>{lon}</span>
        </div>

      </div>
      <div className="data-container">
        <div className="element">
          <img src={DewImage} alt="humidity" className='icon' />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={WindImage} alt="wind" className='icon' />
          <div className="data">
            <div className="wind-percentage">{wind} Km/hr</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </>
  )
}




function App() {
  const WeatherIconList={
    "01d":ClearImage,
    "01n":ClearImage,
    "02d":CloudImage,
    "02n":CloudImage,
    "03d":DrizzleImage,
    "03n":DrizzleImage,
    "04d":DrizzleImage,
    "04n":DrizzleImage,
    "09d":RainImage,
    "09n":RainImage,
    "10d":RainImage,
    "10n":RainImage,
    "13d":SnowImage,
    "13n":SnowImage,
  }
  // states
  const [icon, setIcon] = useState(SnowImage)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [text, setText] = useState()
  const [loading,setLoading]=useState(false)
  const [cityNotFound,setCityNotFound]=useState(false)
  const [weatherMain,setWeatherMain]=useState()
  const [errors,setErrors]=useState(null)

  // async function for fetch real time weather api
  const weatherApi = async() => {
    setLoading(true)
    setCityNotFound(false)
    setErrors(null)
    const API_key = 'b0909940cd4fae2e40c6330641a773fa'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}&units=Metric`
    try {
      const res=await fetch(url)
      
      const result=await res.json()
      if(result.cod==="404"){
        setCityNotFound(true)
        setLoading(false)
        return
      }
      


      setCity(result.name) 
      setTemp(result.main.temp)
      setLat(result.coord.lat)
      setLon(result.coord.lon)
      setWind(result.wind.speed)
      setCountry(result.sys.country)
      setHumidity(result.main.humidity)
      setWeatherMain(result.weather[0].main)
      const weatherIconCode=result.weather[0].icon;

      // setIcon(WeatherIconList[weatherIconCode] || ClearImage)
      setIcon(`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`)

      

    }catch(error){
      
      setErrors('There is an Error while fetch weather details')
    }
    finally{
      setLoading(false)
      
    }
   

  }

  // arrow function for handle city from text box
  const handleCity = (e) => {
    setText(e.target.value)
  }
  // using handlekeyDown function for search when user press Enter Key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      weatherApi()
    }
  }


  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text"
          className='textInput'
          value={text}
          onChange={handleCity} 
          onKeyDown={handleKeyDown} />
          <div className="search-icon" onClick={() => weatherApi()}>
            <img src={SearchImage} alt="Search-icon" />
          </div>

        </div>
        {loading && <div className="loading-message">Loading..</div>}
        {errors && <div className="error-message">{errors}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}

        {/* // stand alone tag for calling weatheDeatils */}
        {!loading && !cityNotFound && city&& 
          <WeatherDetail
           icon={icon}
           temp={temp}
           city={city}
           country={country}
           lat={lat}
           lon={lon}
           humidity={humidity}
           wind={wind}
           weatherMain={weatherMain}

           />
        }
      </div>
    </>
  )
}

export default App

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// b0909940cd4fae2e40c6330641a773fa
