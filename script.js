// გავამზადეთ აპი ინფორაციები რაებიც გვჭირდბეოდა

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// აქ წამოვიღეთ ყველა ელემენტი რომელიც ჰტმლ ში იჯდა რომელზეც დამუშავება გვინდოდა რომ გაგვეკეთებინა
const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

// პარამეტრად გადავაწოდეთ აპი
getMovies(API_URL);

// ასიქნრონული ფუნქცია იმისთვის რომ აპის ფეჩინგი გავაკეთოთ
// ასიქნრონულობას ვიყენებთ იმისთვის როცა სხვა მსიამართიდან ვიღებთ რამე ინფორამციას
// დროი რო ჭირდება ჩასატვირთად მაგისთვის გვინდა რო დალოდება (await) გამოვიძახოთ
// იქამდე დაელოდოს სანამ ყველაფერს არ ჩატვირთავს
async function getMovies(url) {
  console.log(url);

  // მისამართიდან მოაქვს ინფორამცია
  const res = await fetch(url);
  console.log(res);

  // ამას გადაყავს წამოღებული დატა ჯსონ ფორმატში
  const data = await res.json();
  console.log(data.results);

  // აქ ვაწყვდით პარამეტრად ჯსონ ფორმატის ელემენტებს
  // ეს მოდის როგორც
  // [
  //   {
  //     adult: false,
  //     backdrop_path: "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
  //     genre_ids: [28, 12, 53, 878],
  //     id: 460465,
  //   },
  //    {
  //     adult: false,
  //     backdrop_path: "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
  //     genre_ids: [28, 12, 53, 878],
  //     id: 460465,
  //   },
  // ]
  showMovies(data.results);
}

// საიდანაც ვხატავთ ყველა ელემენტს
function showMovies(movies) {
  main.innerHTML = " ";

  // forEach არის მასივისთვის რო თითოეული ელემენტი წამოიღოს
  movies.forEach((movie) => {
    // წინასწარ რა ელემენტებიც იქნებოდა ობიექტში ჩასმული რაც მოდიოდა აპი დან
    // წინასწარ შევქმენით ცვლადები რო აღარ დაგვეწერა movie.title
    const { title, overview, original_language, vote_average, poster_path } =
      movie;
    // ეს ქმნის div ელემენტს
    const movieEl = document.createElement("div");
    // ეს div ელემენტს უქმნის class col-4 ს
    movieEl.classList.add("col-4");

    // აქედან ვახდენთ დახატვას რო თითოეული ელემენტი როგორ გამოვიდეს
    movieEl.innerHTML = `
                <div class="p-4">
                <div class="movies">
                  <img src="${IMG_PATH + poster_path}" >
                  <div class="movie_content_box">
                    <h3>${title}</h3>
                    <p>${overview}</p>
                    <p>${original_language}</p>
                    </div>
                    <span>
                      <p class="${getClassByVote(
                        vote_average
                      )}">${vote_average}</p>
                    </span>
                    </div>
                </div>
            `;
    // ამით გამოძახებულ main დივს შიგნით შვილებად ვუმატებთ ყველა ელემენტს რომელიც ზემოით დავხატეთ
    main.appendChild(movieEl);
    // დაჭერაზე ვქმნით ევენთს რომლეიც ბრაუზერის ლოკალურ მონაცემთა ბაზაში ამატებს ერთ ობიექტს
    // რომეზეც დაჭრას ვახდენთ
    movieEl.addEventListener("click", () => {
      // აქედან ჩაემატა
      localStorage.setItem("movie", JSON.stringify(movie));
      // ახალ გვერდზე გადაგიყვანოს
      window.location = "movie.html";
    });
  });
}
// ფუნქცია რომლეიც პარამეტრად იღებს vote_average რომ ფერების კონტროლი ქონდეს
function getClassByVote(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}
// სერჩის ევენთია სუბმითზე რომ გააგზავნოს ახალი რექვესტი რო დახატაული ფილმები განაახლოს
form.addEventListener("submit", (e) => {
  // ფორმს როცა აქცვს თავისი submit ავტომრად არეფრეშებს გვერს და ეგ რო მოვაშოროტ მაგისთვის
  e.preventDefault();
  // აქედან რაც ინფუთში ჩაიწერა მაგას ამოვიღებთ
  const searchTerm = search.value;

  console.log(searchTerm);

  // თუ ჩაწერილი ტექსტი არსებობს ან არ არის ცარილი სტრინგი გამოძხოს რექვესტი
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    // გამოძახების მერე წაშალოს ინფუთში შეყვანილი ტექსტი
    search.value = " ";
    // თუ ზედა არ შესრულდა დაარეფრეშოს
  } else {
    window.location.reload;
  }
});
