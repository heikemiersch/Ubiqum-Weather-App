let appId = "4d62aff061bde8448f8f3cc87a9b0e76";
let units = "metric";
// what people type into searchfield
let searchMethod = "";

// create a function that determines if people enter zip or city, so create a
// function getSearchMethod, pass in searchTerm and assume that if searchTerm.length
// is eqaul to five (as zip codes) and Number.pasrseInt(SearchTerm) plus an empty strin
// (as this converts number to a string in JS), so if it’ s equal to searchTerm itself,
// so it says that every single item in the searchTerm is a number

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = "zip";
    else searchMethod = "q";
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    // calling the url using the variables that i set up above and waiting for data
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        // converting it to json    
        return result.json();
    }).then(result => {
        // calling it with the result from the server
        init(result);
    })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
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
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case "Snow":
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        default:
            document.body.style.backgroundImage = 'url("default.jpg")';
            break;
    }
    // so now grab elements by their id and put data in
    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    let temperatureElement = document.getElementById("temperature");
    let humidityElement = document.getElementById("humidity");
    let windspeedElement = document.getElementById("windSpeed");
    let cityHeader = document.getElementById("cityHeader");
    let weatherIcon = document.getElementById("documentIconImg");

    weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFromServer.weather[0].icon + ".png";

}

// hook up the searchbutton
document.getElementById("searchButton").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    // so if searchTerm exists (if), please call function
    if (searchTerm)
        searchWeather(searchTerm);
})