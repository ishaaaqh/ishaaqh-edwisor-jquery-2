$(document).ready(() => {
  $("#movieDetails").hide();
  // TODO
  $("#loaderElement").hide();

  $("#searchBtn").on("click", () => {
    clickEvent();
  });
  $("#searchForm").on("submit", e => {
    clickEvent();
    e.preventDefault();
  });
});
let dummyPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAS1BMVEXMzMx/f3/Q0NB5eXnIyMiVlZWEhITAwMCLi4vR0dF8fHy0tLSjo6OysrLDw8Obm5t1dXWrq6uIiIimpqa6urqfn5+tra2RkZFvb29zwNirAAAFPElEQVR4nO2biXazKhRG5SAqoDih3vd/0ntwSKMxbdqVv6nm22u1GRhW2R4GKUYRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FRSnzyGmVzflp1Apn0V5UAnUSWGeg5DdMSWQFEI9ByHkMR3EUmSanoHOhIxf3ZwfERw85+oRHLyTgynw9xLexQHF7dA0qtix8C4OKJc8Bwojhb8p9CYOSPFMOiH7ban3cMBRIC7IdFPsPRzEVwrETbG3cECtuXYg003yWzgYVg7MZkR4DweJWDnI39FBs3bQnt7B7WqQ1Ho8KM7ugPzQlG6VQv16PNg0+HQOdCcNLwc3q8GVgu2u0dkcLAvC9UKI/PUC4abMyRxkS9SbtYRezglGuFOvlcklHx3frNpKacY3TUaa8ramMzmgVKzGvrUESvu2Lfa20U/kgOzKgBDJpsF3tlBO5IC7/FqBMMljLTuNg9Xt8SKheahpZ3FwtUmykvBITWdxkJkdBSwh2y9MWl/5O4MDipN9BSxh2JsInDI8SS4pZ3DAc+J9diTwBBK2V5Nl7jyBA/L3gmCSoLYrqWX0NHZ2eHgHt3PiVsLqHonij00lOW0kHN7B3py44fo/6+u1pFTjdwd3QOWXCripuZ4LbYOGVxB0cAc6Gj4dC24k3BgzwtOxHUTNQwpCz9dhStzLbvpDnz9o7i4LbiXUepoS94LkyA6+g6nvDp5s5j0ciP0gmHkTB58CB3AAB3AAB3AAB3AAB3AAB3BwMgf08N7BA5hjPsfy5X7yN7g9w3wQqGiS59AUB1UQzhP8tYoAAAAA8KvE7ps5069uAZy7rnTJnt7J/QegQj6a0445dWU/X/lQqXR+OahDlR9f3X8//Qv/PWQF/wpHTaP5tOl86nT85uPjnJMdSEuXL6fX6e3lYxxTHs7pTGnGj6+umuv8g4SWUZu2Q0/90Ib/o3dD6bmVVpUuD3dQSk3PLFw58NZzKn/gRC7TcpxT7eeiZG1wQL4cOscObKf4zik44LrK26dhX09omRZJ28usLEROrmp9XnnqTdEnFQd2YwtRU3TtQOdCFQO7GxprE6XLcNWrdClaljpXupC9V5LrNq1NOq6Xs2eeq/17EkYHSa61GrSuM+35rW5qEpaoqKLUkNZOLjmj2UGiKZYuKmOtC6FTyZc4CUVJJ7XuRgd1oXUkU206TU7GriIvuOr05kmP1zPFATdY5UR1xh22aJXp47ABxNeuTrqyLKs0WvWFsbubNNK+7hL2kRQ6a7moDUUnB6Rdnw/BQYh+4dlB3ox1PTwP/RobB3xNh9w3dVzNDrgrFIUd5zdvxgLSjw5ik9Igyr4VmvKB89NY9BIHvVStnR3Q5CDjuqx9bXv32DpQHLpkegpHqmzF7Q5jeT1mjaswxPsqnh24tOLgbwUPeLLlCBqLijkOtPDciSp2UBP3m9AXuNdwXf2LG7wDWTM76EYHXeNSJVse0opCcD9vBueGZpoYStnaVpZEXXAgeRAs4t6IcAivKvjbuWgYEwfdlLFvpNfGeJeV45golEuzvXPOr8Yrbpzn+bHnC99RVIrMFzlpnv18mNO5w3dzVnaUZDxHUB/OoSpHtkm6WLkwkYb0uWhdU9GSG8TgcquVHZKcQ2XgQOK68te19BNoWd8sP+NKRzkewyWtH9Shy/ppLvexkLokhwXUUtH0lpbsdx/6+ZtQmfS1qQ/0F/8DqOi6v7im+1UOFbYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8Gv8Dl/RDY8m9VxUAAAAASUVORK5CYII=";

let clickEvent = () => {
  let searchText = $("#searchText").val();
  console.log(searchText);

  if ($("#byName").prop("checked")) {
    if (searchText == "") {
      alert("Please enter movie name");
      return;
    }
    getMoviesByText(searchText);
  } else if ($("#byIMDBId").prop("checked")) {
    if (searchText == "") {
      alert("Please enter iMDB id");
      return;
    }
    getMoviesById(searchText);
  }
};

let getMoviesByText = searchText => {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: `http://www.omdbapi.com/?apikey=883b3010&t=${searchText}`,
    success: response => {
      console.log(response);
      if (response.Response == "True") {
        $("#moviePoster").html(`
        <div id="moviePoster" class="col-sm-12 col-lg-4 col-xs-12 col-md-4 text-center animated slideInLeft"></div><img src=${
          response.Poster
        } class="image"/>`);
        setValuesInDom(response);
        if (response.Poster == "N/A") {
          $("#moviePoster").html(`
          <div id="moviePoster" class="col-sm-12 col-lg-4 col-xs-12 col-md-4 text-center animated slideInLeft"></div><img src=${dummyPic} class="image"/>`);
        }
      } else {
        alert("No movies found....");
        $("#moviePoster").html(`
        <div id="moviePoster" class="col-sm-12 col-lg-4 col-xs-12 col-md-4 text-center animated slideInLeft"></div><img src=${dummyPic} class="image"/>`);
      }
    },
    beforeSend: function() {
      resetValue();
      $("#loaderElement").show();
    },

    complete: function() {
      $("#movieDetails").show();
      $("#loaderElement").hide();
    },
    error: function(request, errorType, errorMessage) {
      $("#loaderElement").hide();
      console.log(request);
      console.log(errorType);
      alert("Something Wrong Happened");
    },

    timeout: 30000 // in ms
  });
};

let getMoviesById = searchText => {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: `http://www.omdbapi.com/?apikey=883b3010&i=${searchText}`,
    success: response => {
      if (response.Response == "True") {
        $("#moviePoster").html(`<img src=${response.Poster} class="image"/>`);
        setValuesInDom(response);
        if (response.Poster == "N/A") {
          $("#moviePoster").html(`<img src=${dummyPic} class="image"/>`);
        }
      } else {
        alert("No movies found....");
        $("#moviePoster").html(`<img src=${dummyPic} class="image"/>`);
      }
    },
    beforeSend: function() {
      resetValue();
      $("#loaderElement").show();
    },

    complete: function() {
      $("#movieDetails").show();
      $("#loaderElement").hide();
    },
    error: function(request, errorType, errorMessage) {
      $("#loaderElement").hide();
      console.log(request);
      console.log(errorType);

      alert("Something Wrong Happened");
    },

    timeout: 30000 // in ms
  });
};

let setValuesInDom = response => {
  $("#title").html(`<h3>${response.Title}</h3>`);
  console.log(response.title)
  $("#release").html(response.Released);

  $("#director").html(response.Director);

  $("#imdbRating").html(response.imdbRating);

  $("#imdbId").html(response.imdbID);

  $("#awards").html(response.Awards);

  setDOMfromArray(response.Actors, "actor");

  setDOMfromArray(response.Language, "language");

  setDOMfromArray(response.Genre, "genre");

  for (const iterator of response.Ratings) {
    if (iterator.Source == "Internet Movie Database") {
      console.log(iterator.Value);

      $("#imdb").html(iterator.Value);
    }
    if (iterator.Source == "Rotten Tomatoes") {
      $("#rottenTomatoes").html(iterator.Value);
    }
    if (iterator.Source == "Metacritic") {
      $("#metaCritic").html(iterator.Value);
    }
  }

  $("#Country").html(response.Country);

  $("#Runtime").html(response.Runtime);

  $("#Writer").html(response.Writer);

  $("#Metascore").html(response.Metascore);

  $("#Plot").html(response.Plot);

  $("#Rated").html(response.Rated);

  $("#Type").html(response.Type);

  $("#Year").html(response.Year);

  $("#imdbVotes").html(response.imdbVotes);
  if (response.totalSeasons) {
    $("#totalSeasons").html(response.totalSeasons);
  } else {
    $("#totalSeasons").html("N/A");
  }
};

let resetValue = () => {
  $("#moviePoster").html('<img src="' + dummyPic + '" class="image"/>');

  $("#title").html("");

  $("#release").html("");

  $("#director").html("");

  $("#imdb").html("");

  $("#imdbId").html("");

  $("#awards").html("");

  $("#production").html("");
};

let setDOMfromArray = (array, element) => {
  let listOfActors = "";
  for (const iterator of array) {
    listOfActors += iterator;
  }

  $(`#${element}`).html(listOfActors);
};
