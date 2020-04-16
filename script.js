let movieApp = {}

movieApp.userResponse;

movieApp.key = '3628ebe0c40080ef9275f966a8eaaa92'

movieApp.url = 'https://api.themoviedb.org/3/movie'

movieApp.init = function () {
    // listen for click on the how to play button to display alert 
    $('button.howTo').on('click', function (e) {
        e.preventDefault();
        alert(`click the movie you think is more popular!`)
    });

    // listen for click on Let's Play button to scroll down the game area
    $("button.letsPlay").on('click', function () {
        $('html').animate({
            scrollTop: $('footer').offset().top
        }, 'slow');
        return false;
    });
}


// get random number to be used to get 2 random movies 
// if statement to ensure 2 different movies are stored
const randomMovie = Math.floor(Math.random() * 20);
let randomMovie2 = Math.floor(Math.random() * 20);
    if (randomMovie2 === randomMovie) {
        randomMovie2 = Math.floor(Math.random() * 20);
    }


// AJAX CALL
movieApp.getData = () => {
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/popular',
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: movieApp.key,
            format: 'json',
        }
    }).then((result) => {
        // Movie images
        const movieImg = result.results[randomMovie].poster_path;
        const movieURL = `https://image.tmdb.org/t/p/original/${movieImg}`;

        const movieImg2 = result.results[randomMovie2].poster_path;
        const movieURL2 = `https://image.tmdb.org/t/p/original/${movieImg2}`;

        // Movie ratings
        const movieRating = result.results[randomMovie].vote_average;
        const movieRating2 = result.results[randomMovie2].vote_average;


        // Console logs for testing
        console.log(movieURL);
        console.log(movieRating);
        console.log(movieRating2);


        // Display to the DOM
        const displayMovieImage = `<img class="movie1" src="${movieURL}" alt="will figure out">`
        const displayMovieImage2 = `<img class="movie2" src="${movieURL2}" alt="will figure out">`
        $('main').append(displayMovieImage);
        $('main').append(displayMovieImage2);


        // Comparing the 2 movie ratings and storing the higher rated movie in popularMovie variable
        if (movieRating > movieRating2) {
            popularMovie = movieRating;
        } else {
            popularMovie = movieRating2;
        }

        let userSelection = 0;

    // When user selects one of the movies store user selection in a variable called userSelection 
    // assign userSelection to the corresponding movie rating
    // Compare user selection with popularMovie variable - used if else statement to determine if user selected the more popular movie
        $("img.movie1").on('click', function () {
            userSelection = movieRating;
            console.log(userSelection)
            if (userSelection === popularMovie) {
                console.log("CORRECT");
            } else {
                console.log("WRONG");
            }
        });

        $("img.movie2").on('click', function () {
            userSelection = movieRating2;
            console.log(userSelection);
            if (userSelection === popularMovie) {
                console.log("CORRECT");
            } else {
                console.log("WRONG");
            }
        });



        
    })

}

movieApp.getData()

// Document Ready
$(document).ready(function () {
    movieApp.init()
});