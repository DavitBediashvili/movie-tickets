const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const API_URL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const movie_info = document.getElementById("movie_container");

const movie = localStorage.getItem("movie");
const movieData = JSON.parse(movie);

const seat = localStorage.getItem("buying");
const seatData = JSON.parse(seat);

// ახალი დივი შევქმენით
const moviePoster = document.createElement("div");
// კლასი რომლეიც არის bootstrap კლასი
moviePoster.classList.add("container");
moviePoster.setAttribute("id", "poster");

moviePoster.innerHTML = `
    <div class="col-4">
        <img src="${IMG_PATH + movieData.poster_path}" alt="Movie Poster">
    </div>
`;
movie_info.appendChild(moviePoster);

const movieDesc = document.createElement("div");
// კლასი რომლეიც არის bootstrap კლასი
movieDesc.classList.add("container");
movieDesc.setAttribute("id", "poster");

movieDesc.innerHTML = `
    <div id="movie_info" class="movie-info">
        <h2 class="movie-title">${movieData.title}</h2>
        <p class="seat-info">Selected Seat: ${seatData.id} <br> price: ${seatData.price}$</p>
    </div> 
`;
movie_info.appendChild(movieDesc);


const home_button = document.getElementById("home");
home_button.addEventListener("click", () => {
    window.location.href = "index.html";
});





