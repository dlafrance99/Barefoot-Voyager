// Global Variables

var userLocation;
var userDates;
var userInterests;

// Grabs information from user input on forms after submit button is clicked 

$("#submit").on("click", function (event) {
    event.preventDefault();

    userLocation = $("#location-input").val().trim();
    console.log(userLocation);
    userDates = $("#date-input").val().trim();
    console.log(userDates);
    userInterests = $("#interest-input").val().trim();
    console.log(userInterests);

    if ($("#location-input").hasClass("valid") && $("#date-input").hasClass("valid") && $("#interest-input").hasClass("valid")) {

        youTubeAPICall();
        openWeatherAPICall();
        ticketMasterAPICall();
        newsAPICall();
        breweryAPICall();

    } else {

        $("<p> Invalid selection, Please try again!</p>").modal();

    }
});

$("#search-again").on("click", function (event) {
    event.preventDefault();

    $("#location-input").val("");
    $("#date-input").val("");
    $("#interest-input").val("");

    $("#weather-div").empty();
    $(".forecast").empty();
    $(".newsDiv").empty();
    $(".ticket-information").empty();
    $(".youtube-insert").empty();
    $(".breweryDiv").empty();
    $(".content").empty();
});

// Tie into YouTube API and display videos based on userLocation and userInterests

function youTubeAPICall() {
    var locationYouTube = userLocation;
    var userInterestYouTube = userInterests;
    var searchYouTube = locationYouTube + " " + userInterestYouTube;

    var queryURLYouTube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchYouTube + "&type=video&key=AIzaSyB8DRZm65uhLchA5CJ7k_6od-xh013ofd8";

    $.ajax({
        url: queryURLYouTube,
        method: "GET"
    }).then(function (response) {

        var newDivideYouTube = $("<div id='youtube-div'>");
        var videoDiv = $("<div class='video'>");
        for (var i = 0; i < 3; i++) {
            var youTubeVideoId = response.items[i].id.videoId
            var youTubePageAdd = "https://www.youtube.com/embed/" + youTubeVideoId;

            var youTubePlace = $("<iframe>")
            youTubePlace.attr("width", "auto");
            youTubePlace.attr("height", "auto");
            youTubePlace.attr("src", youTubePageAdd);
            youTubePlace.attr("frameborder", "0");
            youTubePlace.attr("allow", "accelerometer; encrypted-media; gyroscope; picture-in-picture");

            videoDiv.append(youTubePlace);
        };
        newDivideYouTube.append(videoDiv);
        newDivideYouTube.addClass("youtube-div");
        $(".content").append(newDivideYouTube);
        $(".youtube-div").prepend("<h4 id='youtube-header'>YouTube Videos</h4>")

    })
};

// Tie into OpenWeather API and display current weather based on userLocation

function openWeatherAPICall() {
    var locationWeather = userLocation;
    var apiKeyWeather = "cbe15fe8bd11f0165e29631925aca3d4";

    var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + locationWeather + "&appid=" + apiKeyWeather + "&units=imperial";
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationWeather + "&appid=" + apiKeyWeather + "&units=imperial";

    // This AJAX calls the current weather for the destination city based on userLocation

    $.ajax({
        url: queryURLOpenWeather,
        method: "GET"
    }).then(function (response) {

        var weatherOverlay = $("<div id='weather-div'>")

        var infoWeatherOverlay = `<p>Today's Weather Information for ${response.name}</p><p>Temperature: ${response.main.temp} F</p><p>High Temperature: ${response.main.temp_max} F</p><p>Low Temperature: ${response.main.temp_min} F</p><p>Wind Speed ${response.wind.speed} mph</p><p>Current Conditions: ${response.weather[0].description}</p><hr><p>5 Day Forecast for ${response.name}<p><hr>`;

        weatherOverlay.append(infoWeatherOverlay);
        $(".content").append(weatherOverlay);
    });

    // This AJAX calls the forecasted weather for the destination city based on userLocation

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (var i = 7; i < 40; i += 8) {

            var weatherForecast = (moment(response.list[i].dt_txt, "YYYY-MM-DD h:mm:ss").format("dddd, MMMM Do, h:mma"));
            console.log(weatherForecast)

            var forecastOverlay = $("<div class='forecast'>");

            var forecastWeatherOverlay = `<p>Date: ${weatherForecast}</p><p>Temperature: ${response.list[i].main.temp} F</p><p>Current Conditions: ${response.list[i].weather[0].description}</p><p>Wind Speed: ${response.list[i].wind.speed} mph</p><hr>`

            forecastOverlay.append(forecastWeatherOverlay);
            $(".content").append(forecastOverlay);

        }

    });
};

// news api 
function newsAPICall() {

    if ($("#location-input").hasClass("valid") && $("#date-input").hasClass("valid") && $("#interest-input").hasClass("valid")) {


        var location = $("#location-input").val().trim();
        var articleLimit = 5;
        var newsAPIkey = "3fe53b99010243faa5ad7667a9f9d73f";
        var newsURL = "https://newsapi.org/v2/everything?q=" + location + "&apiKey=3fe53b99010243faa5ad7667a9f9d73f&pageSize=" + articleLimit;


        $.ajax({
            url: newsURL,
            method: "GET",
        }).then(function (response) {
            var articles = response.articles;
            console.log(articles);
            var newsDiv = $("<div>");
            newsDiv.addClass("newsDiv")
            for (var i = 0; i < articles.length; i++) {
                var headline = articles[i].title;
                var byline = articles[i].author;
                var source = articles[i].source.name;
                var articlepictureURL = articles[i].urlToImage;
                var articleNumber = i + 1;
                var articleUrl = articles[i].url;




                var articleImage = $("<img>");
                articleImage.attr("src", articlepictureURL);
                articleImage.addClass("newsImg")

                var newsSection = $("<div>");
                newsSection.addClass("newsSection clearfix");

                newsSection.append("<h5 class='headline'>" + articleNumber + ") <a href='" + articleUrl + "'>" + headline + "</a></h5>");
                newsSection.append("<h6 class='byline'>By: " + byline + "</h6>");
                newsSection.append("<h6 class='source'>Source: " + source + "</h6>");

                newsSection.append(articleImage);
                newsDiv.append(newsSection);

                if (i < (articles.length - 1)) {
                    newsDiv.append("<hr>");
                }

            };
            newsDiv.prepend("<h4 id='news-header'>Top News</h4>")
            $(".content").append(newsDiv);
        });

    } else {

        $("<p> Invalid selection, Please try again!</p>").modal();

    }
};

// Brewery API Call
function breweryAPICall() {
    if ($("#location-input").hasClass("valid") && $("#date-input").hasClass("valid") && $("#interest-input").hasClass("valid")) {

        function breweryApi() {

            var url = "https://api.openbrewerydb.org/breweries?by_city=" + userLocation;
            var breweryDiv = $("<div>");
            breweryDiv.addClass("breweryDiv")

            $.ajax({
                url,
                method: "Get"
            }).then(function (response) {
                for (i = 0; i < 3; i++) {
                    var name = response[i].name;
                    var street = response[i].street;

                    breweryDiv.append("<h4>" + name + "</h4>");
                    breweryDiv.append("<p>" + street + "</p>");

                }
                $(".content").after(breweryDiv);
            })
        }
        breweryApi();
    } else {

        $("<p> Invalid selection, Please try again!</p>").modal();

    }

};

//form validation check 

function validation() {

    $("#location-input").on("input", function () {
        var input = $(this);
        var location = input.val();
        input.addClass("invalid");

        if (location) {
            input.removeClass("invalid").addClass("valid");
            $(".error-location").remove();

        } else {
            input.removeClass("valid").addClass("invalid");
            $(".error-location").text("Please input a valid location");
        }

    })

    $("#interest-input").on("input", function () {
        var input = $(this);
        var interest = input.val();

        if (interest) {
            input.removeClass("invalid").addClass("valid");
            $(".error-interests").remove();

        } else {
            input.removeClass("valid").addClass("invalid");
            $(".error-interests").text("Please input a valid interest");
        };

    })

    $("#date-input").val("");
}

//calendar 

$('input[name="dates"]').daterangepicker({
	showShortcuts: false,
	showTopbar: false
}, function(start, end, label) {
  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});

console.log($("#location-input").hasClass("valid"));
console.log($("#date-input").hasClass("valid"));
console.log($("#interest-input").hasClass("valid"));

// $("#location-input").hasClass("valid") && $("#date-input").hasClass("valid") && $("#interest-input").hasClass("valid")
// $('input[name="dates"]').daterangepicker();

// added the TM

function ticketMasterAPICall() {

    var location = $("#location-input").val().trim();
    var Limit= 5;
    var ticketMasterAPIkey = "TFjXDEI1LogVpEJmc428NgcftKE2zdS6f";
    var ticketURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + location + "&apikey=TFjXDEI1LogVpEJmc428NgcftKE2zdS6";

    $.ajax({
        url: ticketURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response._embedded.events;
            console.log(results);
            var ticketsDiv = $("<div>");
            
            for (var i = 0; i < 5; i++) {
                var pname= $("<p>").text(results[i].name);
                $(ticketsDiv).append(pname)
                var pdate= $("<p>").text(results[i].dates.start.localDate);
                $(ticketsDiv).append(pdate);
            }
            $(".ticket-information").append(ticketsDiv)
        })
};

console.log($("#location-input").hasClass("valid"));
console.log($("#date-input").hasClass("valid"));
console.log($("#interest-input").hasClass("valid"));

// $("#location-input").hasClass("valid") && $("#date-input").hasClass("valid") && $("#interest-input").hasClass("valid")
// $('input[name="dates"]').daterangepicker();

validation();
