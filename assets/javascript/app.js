// Grabs information from user input on forms after submit button is clicked 

$(".button-primary").on("click", function(event) {
    event.preventDefault();

    var userLocation = $("#location-input").val().trim();
    console.log(userLocation);
    var userDates = $("#date-input").val().trim();
    console.log(userDates);
    var userInterests = $("#interest-input").val().trim();
    console.log(userInterests);

});

// Tie into YouTube API and display videos based on userLocation and userInterests

function youTubeAPICall () {
    var locationYouTube = "Denver";
    var userInterestYouTube = "Football"
    var searchYouTube = locationYouTube + " " + userInterestYouTube;

    var queryURLYouTube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchYouTube + "&key=AIzaSyB8DRZm65uhLchA5CJ7k_6od-xh013ofd8";

    $.ajax({
        url: queryURLYouTube,
        method: "GET"
      }).then(function (response) {
        console.log(response)

})};

youTubeAPICall();

// curl \
//   'https://www.googleapis.com/youtube/v3/search?part=snippet&location=denver&locationRadius=10m&q=blue&videoEmbeddable=true&key=[YOUR_API_KEY]' \
//   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
//   --header 'Accept: application/json' \
//   --compressed


