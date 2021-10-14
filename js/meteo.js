// Recuperiamo la posizione dell'utente grazie al metodo getCurrentPosition()
// @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError);

/**
 * Callback che viene chiamata quando l'utente conferma di voler essere geolocalizzato.
 * @param {Object} position Posizione dell'utente al momento del caricamento della pagina.
 */
function onPositionSuccess(position) {
  init(position.coords.latitude, position.coords.longitude);
}

/**
 * Callback che viene chiamata quando l'utente nega la geolocalizzazione.
 * @param {Object} Informazioni sull'errore verificatosi.
 */
function onPositionError(error) {
  console.error(`Errore: ${error.code} - ${error.message}`);
}

/**
 * Inizializza l'applicazione recuperando le informazioni metereologiche dalle
 * API di Open Weather Map.
 *
 * @param {Number} lat Latitudine dell'utente
 * @param {Number} lon Longitudine dell'utente
 * @returns void
 */
async function init(lat, lon) {
  const apiKey = "b7e21e475a9ead505dc80945fe20ed61"; // API Key fornita da Open Weather Map https://home.openweathermap.org/api_keys
  const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`; // Endpoint di Open Weather Map per recuperare i dati meteo correnti e dei prossimi 7 giorni https://openweathermap.org/api/one-call-api
  const response = await fetch(endpoint); // Al posto di usare then, diciamo di voler aspettare l'esito della promise prima di proseguire.
  if (response.status !== 200) { // Controllo che la risorsa è stata recuperata con successo.
    console.error("Spiacente! Impossibile recuperare il meteo per la posizione corrente");
    return;
  }
  const currentLocationWeather = await response.json(); // Convertiamo il corpo della risorsa in JSON così da poter utilizzare le informazioni per poterle renderizzare in pagina, mostrando all'utente il meteo per la sua zona.

  // TOCCA A TE
}

getWeatherData()
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {

    let { latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`).then(res => res.json()).then(data => {

      console.log(data)
      showWeatherData(data);
    })

  })
}

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const currentWeatherItemsEl = document.querySelector(".currentWeather");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


function TodayWeather(currentWeather) {
  const datecurrentday = new Date((".currentWeather") * 1000);
  let showZeroHour = showZero(datecurrentday.getHours());
  let showZeroMinute = showZero(datecurrentday.getMinutes());
  let showZeroSecond = showZero(datecurrentday.getSeconds());

  currentWeather.innerHTML =
    `<div class="current-info">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

<div class="current-temperature">${Math.round(currentWeather.temp - 176)}°C</div>

<div class="currentWeather">
<div class="date">${datecurrentday.toLocaleDateString("en", { weekday: "short" })}</div>
<div class="hour">${showZeroHour}:${showZeroMinute}:${showZeroSecond}</div>
<div class="current-status">${currentWeather.Weather[0].main}</div>
`;
}





