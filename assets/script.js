//var searchEl = $("#search-button");
var cityName = "London";
var searchButton = $("#search-button");
var userInput = $("#search-input");
console.log(userInput)
var APIKey = "06049584939bfdb947b35800e5407bab";

// Here we are building the URL we need to query the database

//function getWeather(cityName) {
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);

        searchButton.on("click", function (event) {
            event.preventDefault()
            console.log(userInput[0].value);
            var iconcode = response.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $(".weather-icon").attr("src", iconURL);
            var tempC = Math.floor(response.list[0].main.temp - 273.15);
            var wind = response.list[0].wind.speed;
            var humidity = response.list[0].main.humidity;

            $("#city-name").append(response.city.name)

            $("#image").prepend(iconURL);
            console.log(iconURL);
            $("#temperature").append("Temp: " + tempC + "°C")
            $("#wind").append("Wind Speed: " + wind + "MPH")
            $("#humidity").append("Humidity: " + humidity + "%")


    

        });

    });

//};






