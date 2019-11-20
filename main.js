let appId = "4";

let units = "metric";
// what people type into searchfield
let searchMethod = "";

// create a function that determines if people enter zip or city, so create a
// function getSearchMethod, pass in searchTerm and assume that if searchTerm.length
// is eqaul to five (as zip codes) and Number.pasrseInt(SearchTerm) plus an empty strin
// (as this converts number to a string in JS), so if it’ s equal to searchTerm itself,
// so it says that every single item in the searchTerm is a number

function getSearchMethod(searchTerm) {
  // if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
  //     searchMethod = "zip";
  // else
  searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  // calling the url using the variables that i set up above and waiting for data
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      // converting it to json
      return result.json();
    })
    .then(result => {
      // calling it with the result from the server
      init(result);
    });
}

function init(data) {
  switch (data.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;
    case "Mist":
      document.body.style.backgroundImage = 'url("mist.jpg")';
      break;
    case "Rain":
    case "Drizzle":
      document.body.style.backgroundImage = 'url("rain.jpg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("storm.jpg")';
      break;
    default:
      // document.body.style.backgroundImage = 'url("default.jpg")';
      break;
  }

  // so now grab elements by their id and put data in
  let weatherDescriptionKeyword = document.getElementById(
    "weatherDescriptionKeyword"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let city = document.getElementById("city");
  let weatherIcon = document.getElementById("weatherIcon");
  let tempMinElement = document.getElementById("tempMin");
  let tempMaxElement = document.getElementById("tempMax");

  weatherIcon.src =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  resultDescription = data.weather[0].description;
  weatherDescriptionKeyword.innerText = resultDescription.toUpperCase();
  temperatureElement.innerHTML =
    "temperature " + Math.round(data.main.temp * 10) / 10 + " °C";
  city.innerHTML = data.name + ", " + data.sys.country;
  humidityElement.innerHTML = "humidity: " + data.main.humidity + " %";
  tempMinElement.innerHTML =
    "min temperature: " + Math.round(data.main.temp_min * 10) / 10 + " %";
  tempMaxElement.innerHTML =
    "max temperature: " + Math.round(data.main.temp_max * 10) / 10 + " %";

  // console.log(data);
}

// hook up the searchbutton
document.getElementById("searchButton").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  // so if searchTerm exists (if), please call function
  if (searchTerm) searchWeather(searchTerm);
});
