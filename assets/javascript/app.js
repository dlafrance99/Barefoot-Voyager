// Global Variables

var userLocation;
var userDates;
var userInterests;

// Grabs information from user input on forms after submit button is clicked 

$(".button-primary").on("click", function(event) {
    event.preventDefault();

    userLocation = $("#location-input").val().trim();
    console.log(userLocation);
    userDates = $("#date-input").val().trim();
    console.log(userDates);
    userInterests = $("#interest-input").val().trim();
    console.log(userInterests);

    $(".youtube-insert").empty();
    youTubeAPICall();
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
          console.log(response.items[0])
          console.log(response.items[0].id.videoId)
          
          for (var i = 0; i < 5; i++){
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

            newsDiv.append("<h5 id='headline'>" + articleNumber + ") <a href='"+ articleUrl + "'>" + headline + "</a></h5>");
            newsDiv.append("<h6 id='byline'>By: " + byline + "</h6>");
            newsDiv.append("<h6 id='source'>Source: " + source + "</h6>");

            newsDiv.append(articleImage);

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