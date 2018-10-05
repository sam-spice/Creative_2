
var genre_dict = { 'action': 28, 'horror': 27, 'romance': 10749, 'comedy': 35, 'drama': 18 };

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

$(document).ready(function() {
    var selectedFood;
    var selectedMovie;
    $("select.foodType").change(function() {
        selectedFood = $(".foodType option:selected").val();
        //console.log(selectedFood);
    });
    $("select.movieType").change(function() {

        selectedMovie = $(".movieType option:selected").val();
        //console.log(selectedMovie);
    });
    $("#submit-button").click(function(e) {
        e.preventDefault();
        $.when(getRestaurant(selectedFood), get_random_movie(selectedMovie)).done(function(a1, a2) {
            $("#results-div").css("visibility", "visible");
        });
    });
});

function getRestaurant(foodType) {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/search?lat=40.2338&lon=-111.6585&cuisines=" + foodType + "&apikey=c5b6e8a09cf142bdcd344dc3cb7aa9b6";
    return $.getJSON(zomatoURL, function(data) {
        var whichRestaurant = Math.floor((Math.random() * 20) + 1);
        var theLink = (data['restaurants'][whichRestaurant]['restaurant']['url']);
        var thePlace = (data['restaurants'][whichRestaurant]['restaurant']['name']);
        var restaurantLink = "<p class='result-item'>Restaurant Choice: <a href = " + theLink + ">" + thePlace + "</a></p>";
        //console.log(restaurantLink);
        $("#restaurant-results").html(restaurantLink);
    });
}


function get_random_movie(selectedMovie) {
    var genre = genre_dict[selectedMovie];
    var api_url = "https://api.themoviedb.org/3/discover/movie?api_key=2515221d442c42af9df5c15741bf77b4&language=en-US&with_genres=" + genre.toString() + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    var a_tag_to_return;
    return $.ajax({
        url: api_url,
        dataType: "json",
        success: function(parsed_json) {
            var random_film_idx = Math.floor(Math.random() * parsed_json['results'].length);
            var title = parsed_json['results'][random_film_idx]['title'];
            var id = parsed_json['results'][random_film_idx]['id'];
            var movie_link = "https://www.themoviedb.org/movie/" + id;
            var movie_a_tag = "<p class='result-item'>Movie Choice: <a href = " + movie_link + ">" + title + "</a></p>";
            $('#movie-results').html(movie_a_tag);
        }
    });
}
/*
 */
//OMDB API
//"http://www.omdbapi.com/?t=" + movieTitle (replace spaces with '+') + "&apikey=17e04105"

//zomato api key
//c5b6e8a09cf142bdcd344dc3cb7aa9b6
//"https://developers.zomato.com/api/v2.1/search?lat=40.2338&lon=-111.6585&cuisines=" + selectedFood + "&apikey=c5b6e8a09cf142bdcd344dc3cb7aa9b6"

// Reserved: 1216 HBLL on Wed, October 3rd from 5:00pm to 7:00pm

// the movie dv apikey
// 2515221d442c42af9df5c15741bf77b4
// example: https://api.themoviedb.org/3/discover/movie?api_key=2515221d442c42af9df5c15741bf77b4&language=en-US&with_genres=37&sort_by=popularity.desc&include_adult=false&include_video=false&page=1