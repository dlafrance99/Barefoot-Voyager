// Global Variables

var userLocation;
var userDates;
var userInterests;

// Grabs information from user input on forms after submit button is clicked 

$("#submit").on("click", function(event) {
    validation();

    event.preventDefault();

    userLocation = $("#location-input").val().trim();
    console.log(userLocation);
    userDates = $("#date-input").val().trim();
    console.log(userDates);
    userInterests = $("#interest-input").val().trim();
    console.log(userInterests);

    $(".youtube-insert").empty();
    youTubeAPICall();
    openWeatherAPICall();
});

// Tie into YouTube API and display videos based on userLocation and userInterests
function youTubeAPICall () {
    var locationYouTube = userLocation;
    var userInterestYouTube = userInterests;
    var searchYouTube = locationYouTube + " " + userInterestYouTube;

    var queryURLYouTube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchYouTube + "&type=video&key=AIzaSyB8DRZm65uhLchA5CJ7k_6od-xh013ofd8";

    $.ajax({
        url: queryURLYouTube,
        method: "GET"
      }).then(function (response) {
          
          for (var i = 0; i < 3; i++){
            var youTubeVideoId = response.items[i].id.videoId
            var youTubePageAdd = "https://www.youtube.com/embed/" + youTubeVideoId;
            var newDivideYouTube = $("<p>");

            var youTubePlace = $("<iframe>")
            youTubePlace.attr("width", "460");
            youTubePlace.attr("height", "315");
            youTubePlace.attr("src", youTubePageAdd);
            youTubePlace.attr("frameborder", "0");
            youTubePlace.attr("allow", "accelerometer; encrypted-media; gyroscope; picture-in-picture");

            newDivideYouTube.append(youTubePlace);
            $(".youtube-information").append(newDivideYouTube);
            
        };
})};

// Tie into OpenWeather API and display current weather based on userLocation
function openWeatherAPICall () {
    var locationWeather = userLocation;
    var apiKeyWeather = "cbe15fe8bd11f0165e29631925aca3d4";

    var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + locationWeather + "&appid=" + apiKeyWeather + "&units=imperial";
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationWeather + "&appid=" + apiKeyWeather + "&units=imperial";

    // This AJAX calls the current weather for the destination city based on userLocation
    $.ajax({
        url: queryURLOpenWeather,
        method: "GET"
    }).then(function (response){
        // console.log(response)

        var weatherOverlay = $("<div>")

        var infoWeatherOverlay = `<p>Today's Weather Information for ${response.name}</p><p>Temperature: ${response.main.temp} F</p><p>High Temperature: ${response.main.temp_max} F</p><p>Low Temperature: ${response.main.temp_min} F</p><p>Wind Speed ${response.wind.speed} mph</p><p>Current Conditions: ${response.weather[0].description}`;

        weatherOverlay.append(infoWeatherOverlay);
        $(".weather-information").append(weatherOverlay);
    });

    // This AJAX calls the forecasted weather for the destination city based on userLocation
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function (response){
        console.log(response)

        for (var i = 7; i < 40; i+=8) {
            var date = response.list[i].dt_txt;
            var stringToDate = new Date(date);
            console.log(stringToDate)
        }

    });
};

// news api 
$("#submit").on("click", function (event) {
    validation();

    event.preventDefault();


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
            var articleNumber = i+1;
            var articleUrl = articles[i].url;
            



            var articleImage = $("<img>");
            articleImage.attr("src", articlepictureURL);
            articleImage.addClass("newsImg")

            var newsSection = $("<div>");
            newsSection.addClass("newsSection clearfix");

            newsSection.append("<h5 class='headline'>" + articleNumber + ") <a href='"+ articleUrl + "'>" + headline + "</a></h5>");
            newsSection.append("<h6 class='byline'>By: " + byline + "</h6>");
            newsSection.append("<h6 class='source'>Source: " + source + "</h6>");

            newsSection.append(articleImage);
            newsDiv.append(newsSection);
           
           if (i<(articles.length-1)){
               newsDiv.append("<hr>");
           }

        };
        $(".content").html(newsDiv);
    });

});


//form validation check 

function validation (){

    $("#location-input").on("input", function() {
        var input = $(this);
        var isText = input.val();
        input.addClass("invalid");

        if (isText){
            input.removeClass("invalid").addClass("valid");
            $(".error-location").text("");
        } else {
            input.removeClass("valid").addClass("invalid");
            $(".error-location").text("Please input a valid location");
        }

    })
    $("#date-input").on("input", function() {
        var input = $(this);
        var isDate = input.val();

        if (isDate){
            input.removeClass("invalid").addClass("valid");
            $(".error-dates").text("");
        } else {
            input.removeClass("valid").addClass("invalid");
            $(".error-dates").text("Please input a valid date range");
        }

    })
    $("#interest-input").on("input", function() {
        var input = $(this);
        var isText = input.val();

        if (isText){
            input.removeClass("invalid").addClass("valid");
            $(".error-interests").text("");

        } else {
            input.removeClass("valid").addClass("invalid");
            $(".error-interests").text("Please input a valid interest");
        }

    })
   
}

validation();
// if()



// $('input[name="dates"]').daterangepicker();
