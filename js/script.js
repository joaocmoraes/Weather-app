// Variáveis e seleção de elementos
const apiKey = "d52b3798b0bc0175a357e401e0cc27c8";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const wheaterIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
// Funções

const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

  return data;
}

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide")
}

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
}

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city); 

  if(data.cod === "404"){
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  wheaterIconElement.setAttribute("src",
   `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
   );
 countryElement.setAttribute("src", apiCountryURL + data.sys.country);
 humidityElement.innerText = `${data.main.humidity}%`;
 windElement.innerText = `${data.wind.speed}km/h`

weatherContainer.classList.remove("hide")

}

// Eventos

searchBtn.addEventListener("click", async(e) =>{
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
       showWeatherData(city);
    }

})