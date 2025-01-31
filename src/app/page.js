import Image from "next/image";

export default function Home() {
  return (
    <div className="weather-app">
      <h3 className="brand">The weather</h3>

      <div>
        <h1 className="name">Algiers</h1>
        <small>
          <span className="time">00:00</span>
          <span className="date">Saturday Feb 01</span>
        </small>
      </div>

      <div className="weather-condition">
        <Image src="/path/to/image.png" alt="Weather Icon" width={50} height={50} />
        <span className="condition">Cloudy</span>
      </div>

      <div>
        <form id="locationInput">
          <input
            type="text"
            className="search"
            placeholder="Search location..."
          />
          <button type="submit" className="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <ul className="cities">
          <li className="city">Algiers</li>
          <li className="city">Blida</li>
          <li className="city">Boumerdas</li>
          <li className="city">Tizi Ouzou</li>
        </ul>

        <ul className="details">
          <h4>Weather Details</h4>
          <li>
            <span>Cloudy</span>
            <span className="cloud">89%</span>
          </li>
          <li>
            <span>Humidity</span>
            <span className="humidity">64%</span>
          </li>
          <li>
            <span>Wind</span>
            <span className="wind">8km/h</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
