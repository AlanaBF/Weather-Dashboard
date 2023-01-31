$(document).ready(function () {
    // empty array for the cities to go in
    cities = [];

    // clear button added to clear page and start again
    $(".clear").click(function () {
        $("#city-input").val("");
        $("#buttons-view").empty();
    });

    // function to render search buttons to page
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < cities.length; i++) {
            // Then dynamically generating buttons for each city in the array
            var searchHistory = $("<button>");
            // Adding a class of movie to our button
            searchHistory.addClass("city");
            // Adding a data-attribute
            searchHistory.attr("data-name", cities[i]);
            // Providing the initial button text
            searchHistory.text(cities[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(searchHistory);
        };
    };
    // function for on click, the cities entered will be saved as a button
    $("#add-city").on("click", function (event) {
        event.preventDefault()
        var city = $("#city-input").val().trim();
        cities.push(city);
        console.log(cities);
        localStorage.setItem("City", cities);
        $("#buttons-view").val(localStorage.getItem(cities));
        renderButtons();

    });

    //function created to display the weather information
    function displayWeatherInfo() {
        var city = $(this).attr("data-name");
        var APIKey = "06049584939bfdb947b35800e5407bab";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("cities-view").text(JSON.stringify(response));
            // Log the queryURL
            console.log(queryURL);
            // Log the resulting object
            console.log(response);

            //retrieving the icon code for the weather image from the api
            var iconcode = response.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $(".weather-icon").attr("src", iconURL);
            // adds todays date which updates on refresh
            var dateToday = moment().format("dddd, MMMM Do YYYY");
            $("#date-today").append(dateToday);
            //retrieving the temp, wind and humidity data from the api
            var tempC = Math.floor(response.list[0].main.temp - 273.15);
            var wind = response.list[0].wind.speed;
            var humidity = response.list[0].main.humidity;
            //append the data to the web application
            $("#image").append(iconURL);
            $("#city-name").append(response.city.name)
            //append the data to web application
            $("#temperature").append("Temp: " + tempC + "°C")
            $("#wind").append("Wind Speed: " + wind + "MPH")
            $("#humidity").append("Humidity: " + humidity + "%")
            //call data for 5 day forecast
            //need [8][16][24][32][39]
            // DAY 1
            var day1 = moment().add(1, 'days').format("DD/MM/YYYY");
            $("#day1").append(day1);
            iconcode = response.list[8].weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $(".weather1").attr("src", iconURL);
            var tempC = Math.floor(response.list[8].main.temp - 273.15);
            var wind = response.list[8].wind.speed;
            var humidity = response.list[8].main.humidity;
            $("#image").append(iconURL);
            //append data to webpage
            $("#temp-day1").append("Temp: " + tempC + "°C")
            $("#wind-day1").append("Wind Speed: " + wind + "MPH")
            $("#humidity-day1").append("Humidity: " + humidity + "%")
            // DAY 2
            var day2 = moment().add(2, 'days').format("DD/MM/YYYY");
            $("#day2").append(day2);
            iconcode = response.list[16].weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $(".weather2").attr("src", iconURL);
            var tempC = Math.floor(response.list[16].main.temp - 273.15);
            var wind = response.list[16].wind.speed;
            var humidity = response.list[16].main.humidity;
            $("#image").append(iconURL);
            //append data to webpage
            $("#temp-day2").append("Temp: " + tempC + "°C")
            $("#wind-day2").append("Wind Speed: " + wind + "MPH")
            $("#humidity-day2").append("Humidity: " + humidity + "%")
            // DAY 3
            var day3 = moment().add(3, 'days').format("DD/MM/YYYY");
            $("#day3").append(day3);
            iconcode = response.list[24].weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $(".weather3").attr("src", iconURL);
            var tempC = Math.floor(response.list[24].main.temp - 273.15);
            var wind = response.list[24].wind.speed;
            var humidity = response.list[24].main.humidity;
            $("#image").append(iconURL);
            //append data to webpage
            $("#temp-day3").append("Temp: " + tempC + "°C")
            $("#wind-day3").append("Wind Speed: " + wind + "MPH")
            $("#humidity-day3").append("Humidity: " + humidity + "%")
            // DAY 4
            var day4 = moment().add(4, 'days').format("DD/MM/YYYY");
            $("#day4").append(day4);
            iconcode = response.list[32].weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $(".weather4").attr("src", iconURL);
            var tempC = Math.floor(response.list[32].main.temp - 273.15);
            var wind = response.list[32].wind.speed;
            var humidity = response.list[32].main.humidity;
            $("#image").append(iconURL);
            //append data to webpage
            $("#temp-day4").append("Temp: " + tempC + "°C")
            $("#wind-day4").append("Wind Speed: " + wind + "MPH")
            $("#humidity-day4").append("Humidity: " + humidity + "%")
            // DAY 5
            var day5 = moment().add(5, 'days').format("DD/MM/YYYY");
            $("#day5").append(day5);
            iconcode = response.list[39].weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $(".weather5").attr("src", iconURL);
            var tempC = Math.floor(response.list[39].main.temp - 273.15);
            var wind = response.list[39].wind.speed;
            var humidity = response.list[39].main.humidity;
            $("#image").append(iconURL);
            //append data to webpage
            $("#temp-day5").append("Temp: " + tempC + "°C")
            $("#wind-day5").append("Wind Speed: " + wind + "MPH")
            $("#humidity-day5").append("Humidity: " + humidity + "%")
        });
    }

    $("#buttons-view").empty();
    $(document).on("click", ".city", displayWeatherInfo);

    renderButtons();

})



