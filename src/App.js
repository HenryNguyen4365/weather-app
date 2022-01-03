import React, { useEffect, useState } from "react";
import "./styles/app.css";
import axios from "axios";
import { APIKEY } from "./keys/apiKey";
import { isEmpty } from "lodash";
const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  useEffect(() => {
    const getDataCode = async () => {
      try {
        await axios
          .get(
            `https://restcountries.com/v2/all
            `
          )
          .then(({ data }) => setCodes(data));
      } catch (error) {
        alert("Your country has no data. Please try again!");
      }
    };
    getDataCode();
  }, []);
  const getData = async () => {
    try {
      await axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${location},${selectedCode}&appid=${APIKEY}&units=metric`
        )
        .then(({ data }) => setData(data));
    } catch (error) {
      alert("Your country has no data. Please try again!");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location !== "") {
      getData();
    } else {
      alert("You've not already filled. Try some countries");
    }
  };
  return (
    <div className="container">
      <div className="weather-container">
        {!isEmpty(data) && (
          <div className="location">
            <h3>
              {data.name} ({data.sys.country})
            </h3>
            <p style={{ fontSize: 32 }}>
              {data.main.temp}
              <sup>0</sup>C
            </p>
          </div>
        )}
        <form className="search" onSubmit={handleSubmit}>
          <label>Choose your country</label>
          <select
            name="country"
            id="country"
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
          >
            {codes.map((code, key) => (
              <option value={code.alpha2Code} key={key}>
                {code.name}
              </option>
            ))}
          </select>
          <label style={{ marginBottom: "2px" }}>
            Type your city where you live in
          </label>
          <div>
            <input
              style={{
                border: "none",
                backgroundColor: "#fff",
                padding: "5px",
              }}
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              name="location"
              value={location}
            />
            <button type="submit" className="select">
              Pick up
            </button>
          </div>
        </form>
        {!isEmpty(data) && (
          <div className="information">
            {data.weather && <p>Weather: {data.weather[0].main}</p>}
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
