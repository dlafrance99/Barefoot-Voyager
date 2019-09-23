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
    var userInterestYouTube = "Music"
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
            var youTubePageAdd = "https://www.youtube.com/embed?v=" + youTubeVideoId;
            var newDivide = $("<div>")

            var youTubePlace = $("<iframe>")
            youTubePlace.attr("width", "560");
            youTubePlace.attr("height", "315");
            youTubePlace.attr("src", youTubePageAdd);
            youTubePlace.attr("frameborder", "0");
            youTubePlace.attr("allow", "accelerometer; encrypted-media; gyroscope; picture-in-picture");

            
            newDivide.append(youTubePlace);
            $(".youtube-insert").append(newDivide);
            
        };
        // var youTubeEmbed = $(".youtube-embed").attr({
        //     width: "560",
        //     heigh: "315",
        //     src: youTubePageAdd,
        //     frameborder: "0",
        //     allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture",
        // })


        // newDivide.append(youTubeEmbed);
        // $(".youtube-insert").append(newDivide);

        
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/oxNgpumIWdQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

})};

youTubeAPICall();

