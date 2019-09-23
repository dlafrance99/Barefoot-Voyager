// news api 
$("#submit").on("click", function(event){
    event.preventDefault();


    var location = $("#location-input").val().trim();
    var articleLimit = 5;
    var newsAPIkey = "3fe53b99010243faa5ad7667a9f9d73f";
    var newsURL = "https://newsapi.org/v2/everything?q=" + location + "&apiKey=3fe53b99010243faa5ad7667a9f9d73f&pageSize=" + articleLimit;

    console.log(newsURL);

   $.ajax({
       url: newsURL,
       method: "GET",
   }).then(function(response){
        var articles = response.articles;
        for (var i=0; i<articles.length; i++){
            var headline = articles[i].title;
            var byline = articles[i].author;
            var source = articles[i].source.name;
            var articlepictureURL = articles[i].urlToImage;

            
        }
   });



});




