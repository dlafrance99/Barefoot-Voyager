// Grabs information from user input on forms

$(".button-primary").on("click", function(event) {
    event.preventDefault();

    var userLocation = $("#location-input").val().trim();
    console.log(userLocation);
    var userDates = $("#date-input").val().trim();
    console.log(userDates);
    var userInterests = $("#interests-input").val().trim();
    console.log(userInterests);

});
