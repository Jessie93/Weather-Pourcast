$(document).ready(function () {
  $("#myModal1").modal("show");
  var cocktailTitleEl = $("#cocktail-title");
  var instructionsEl = $("#cocktail-instructions");

  // function to get a random cocktail on page load and push it onto card

  // Your function goes here
  function getFeaturedCocktail() {
    $.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      function (response) {
        console.log(response);
        console.log(response.drinks[0].strDrinkThumb);
        console.log(response.drinks[0].strDrink);
        cocktailTitleEl.text("Try a glass of " + response.drinks[0].strDrink);
        instructionsEl.text(response.drinks[0].strInstructions);
        $("#cocktail-thumb").attr("src", response.drinks[0].strDrinkThumb);
        console.log(response.drinks[0].strIngredient1);
        console.log(response.drinks[0].strMeasure1);
        for (let i = 0; i < 14; i++)
          if (
            response.drinks[0][`strIngredient${i}`] &&
            response.drinks[0][`strIngredient${i}`] !== "null"
          ) {
            $("#cocktail-ingridients").append(
              `<li> ${response.drinks[0][`strIngredient${i}`]}</li>`
            );
          } else {
            $("#cocktail-ingridients").append(" ");
          }
        for (let i = 0; i < 14; i++) {
          if (
            response.drinks[0][`strMeasure${i}`] &&
            response.drinks[0][`strMeasure${i}`] !== "null"
          ) {
            $("#cocktail-ingridients li")
              .eq(i)
              .prepend(`${response.drinks[0][`strMeasure${i}`]} `);
          } else {
            $("#cocktail-ingridients li").eq(i).prepend("");
          }
        }
      }
    );
  }

  getFeaturedCocktail();

  /**************************************************
   * Get weather in user's city
   ****************************************************/

  var apiKey = "&appid=430a3842b09d883ae73a59e0c1d18fa2";
  var city;
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  var tempC;

  // Build the URL for querying the weather API
  function buildQueryURL() {
    var queryURL = apiURL + city + apiKey;
    return queryURL;
  }
  console.log("Query URL: " + buildQueryURL());

  // Click handler for search city enter button
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    $("#cocktail-ingridients").empty();
    city = $("#search-input").val();
    queryURL = buildQueryURL();

    // Make an AJAX call to the openweather API to retrieve data
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      // Replace HTML cocktail card div with cocktail suitable for the weather
      function updateCard() {
        var tempK = response.main.temp;
        var tempC = (tempK - 273.15).toFixed(0); // converts default Kelvin temperature to Celcius
        var weather = $("<h4>")
          .addClass("weather")
          .text("The Tempreature in " + city + " is " + tempC + "°C.");
        console.log(weather);

        // Empty out the div before adding the weather for the new city
        $(".weather-div").empty();
        $(".weather-div").append(weather);
      } // end function updateCard
      updateCard();

      // Click handler to clear form when user clicks in the search field
      $("#search-input").on("click", function () {
        $(this).val("");
      });

      function getRightCocktail() {
        console.log(response.main.temp);
        if (response.main.temp < 277) {
          getRandomWhiskeyCocktail();
        }
        if (response.main.temp > 276 && response.main.temp < 283) {
          getRandomVodkaCocktail();
        }
        if (response.main.temp > 282 && response.main.temp < 290) {
          getRandomGinCocktail();
        }
        if (response.main.temp > 289 && response.main.temp < 297) {
          getRandomRumCocktail();
        }
        if (response.main.temp > 296) {
          getRandomTequilaCocktail();
        }
      }
      getRightCocktail();
    });
  }); // end of search-btn click event listener

  // Event handler for tapping the enter button on the keyboard
  $("#search-input").on("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      //event.keyCode is depreciated. Left here to support older browsers
      event.preventDefault();
      $("#search-btn").click();
    }
  });

  /**************************************************
   * Functions for different cocktails based on ingridients
   ****************************************************/

  function getRandomWhiskeyCocktail() {
    console.log();
    $.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey",
      function (response) {
        console.log(response);
        var randomIndex =
          response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex);
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        getfullWhiskeyCocktail();
        function getfullWhiskeyCocktail() {
          $.get(
            "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              currentCocktail,
            function (response) {
              var whiskeyCocktail = response;
              console.log(whiskeyCocktail);
              console.log(whiskeyCocktail.drinks[0].strDrink);
              cocktailTitleEl.text(
                "Something warming for this cold day? Try a glass of " +
                  whiskeyCocktail.drinks[0].strDrink
              );
              instructionsEl.text(whiskeyCocktail.drinks[0].strInstructions);
              $("#cocktail-thumb").attr(
                "src",
                whiskeyCocktail.drinks[0].strDrinkThumb
              );
              for (let i = 0; i < 14; i++)
                if (
                  whiskeyCocktail.drinks[0][`strIngredient${i}`] &&
                  whiskeyCocktail.drinks[0][`strIngredient${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients").append(
                    `<li> ${
                      whiskeyCocktail.drinks[0][`strIngredient${i}`]
                    }</li>`
                  );
                } else {
                  $("#cocktail-ingridients").append(" ");
                }
              for (let i = 0; i < 14; i++) {
                if (
                  whiskeyCocktail.drinks[0][`strMeasure${i}`] &&
                  whiskeyCocktail.drinks[0][`strMeasure${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients li")
                    .eq(i)
                    .prepend(`${whiskeyCocktail.drinks[0][`strMeasure${i}`]} `);
                } else {
                  $("#cocktail-ingridients li").eq(i).prepend("");
                }
              }
            }
          );
        }
      }
    );
  }

  function getRandomVodkaCocktail() {
    console.log();
    $.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka",
      function (response) {
        console.log(response);
        var randomIndex =
          response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex);
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        getfullVodkaCocktail();
        function getfullVodkaCocktail() {
          $.get(
            "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              currentCocktail,
            function (response) {
              var vodkaCocktail = response;
              console.log(vodkaCocktail);
              console.log(vodkaCocktail.drinks[0].strDrink);
              cocktailTitleEl.text(
                "Why not try a glass of " +
                  vodkaCocktail.drinks[0].strDrink +
                  ", perfect for a chilly day"
              );
              instructionsEl.text(vodkaCocktail.drinks[0].strInstructions);
              $("#cocktail-thumb").attr(
                "src",
                vodkaCocktail.drinks[0].strDrinkThumb
              );
              for (let i = 0; i < 14; i++)
                if (
                  vodkaCocktail.drinks[0][`strIngredient${i}`] &&
                  vodkaCocktail.drinks[0][`strIngredient${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients").append(
                    `<li> ${vodkaCocktail.drinks[0][`strIngredient${i}`]}</li>`
                  );
                } else {
                  $("#cocktail-ingridients").append(" ");
                }
              for (let i = 0; i < 14; i++) {
                if (
                  vodkaCocktail.drinks[0][`strMeasure${i}`] &&
                  vodkaCocktail.drinks[0][`strMeasure${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients li")
                    .eq(i)
                    .prepend(`${vodkaCocktail.drinks[0][`strMeasure${i}`]} `);
                } else {
                  $("#cocktail-ingridients li").eq(i).prepend("");
                }
              }
            }
          );
        }
      }
    );
  }

  function getRandomGinCocktail() {
    console.log();
    $.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin",
      function (response) {
        console.log(response);
        var randomIndex =
          response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex);
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        getfullGinCocktail();
        function getfullGinCocktail() {
          $.get(
            "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              currentCocktail,
            function (response) {
              var ginCocktail = response;
              console.log(ginCocktail);
              console.log(ginCocktail.drinks[0].strDrink);
              cocktailTitleEl.text(
                "Brighten up this mild day with a glass of " +
                  ginCocktail.drinks[0].strDrink
              );
              instructionsEl.text(ginCocktail.drinks[0].strInstructions);
              $("#cocktail-thumb").attr(
                "src",
                ginCocktail.drinks[0].strDrinkThumb
              );
              for (let i = 0; i < 14; i++)
                if (
                  ginCocktail.drinks[0][`strIngredient${i}`] &&
                  ginCocktail.drinks[0][`strIngredient${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients").append(
                    `<li> ${ginCocktail.drinks[0][`strIngredient${i}`]}</li>`
                  );
                } else {
                  $("#cocktail-ingridients").append(" ");
                }
              for (let i = 0; i < 14; i++) {
                if (
                  ginCocktail.drinks[0][`strMeasure${i}`] &&
                  ginCocktail.drinks[0][`strMeasure${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients li")
                    .eq(i)
                    .prepend(`${ginCocktail.drinks[0][`strMeasure${i}`]} `);
                } else {
                  $("#cocktail-ingridients li").eq(i).prepend("");
                }
              }
            }
          );
        }
      }
    );
  }

  function getRandomRumCocktail() {
    console.log();
    $.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum",
      function (response) {
        console.log(response);
        var randomIndex =
          response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex);
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        getfullRumCocktail();
        function getfullRumCocktail() {
          $.get(
            "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              currentCocktail,
            function (response) {
              var rumCocktail = response;
              console.log(rumCocktail);
              console.log(rumCocktail.drinks[0].strDrink);
              cocktailTitleEl.text(
                "Something cool on this warm day? Try a glass of " +
                  rumCocktail.drinks[0].strDrink
              );
              instructionsEl.text(rumCocktail.drinks[0].strInstructions);
              $("#cocktail-thumb").attr(
                "src",
                rumCocktail.drinks[0].strDrinkThumb
              );
              for (let i = 0; i < 14; i++)
                if (
                  rumCocktail.drinks[0][`strIngredient${i}`] &&
                  rumCocktail.drinks[0][`strIngredient${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients").append(
                    `<li> ${rumCocktail.drinks[0][`strIngredient${i}`]}</li>`
                  );
                } else {
                  $("#cocktail-ingridients").append(" ");
                }
              for (let i = 0; i < 14; i++) {
                if (
                  rumCocktail.drinks[0][`strMeasure${i}`] &&
                  rumCocktail.drinks[0][`strMeasure${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients li")
                    .eq(i)
                    .prepend(`${rumCocktail.drinks[0][`strMeasure${i}`]} `);
                } else {
                  $("#cocktail-ingridients li").eq(i).prepend("");
                }
              }
            }
          );
        }
      }
    );
  }

  function getRandomTequilaCocktail() {
    console.log();
    $.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila",
      function (response) {
        console.log(response);
        var randomIndex =
          response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex);
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        getfullTequilaCocktail();
        function getfullTequilaCocktail() {
          $.get(
            "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              currentCocktail,
            function (response) {
              var tequilaCocktail = response;
              console.log(tequilaCocktail);
              console.log(tequilaCocktail.drinks[0].strDrink);
              cocktailTitleEl.text(
                "It's hot out there! Cool down with a glass of " +
                  tequilaCocktail.drinks[0].strDrink
              );
              instructionsEl.text(tequilaCocktail.drinks[0].strInstructions);
              $("#cocktail-thumb").attr(
                "src",
                tequilaCocktail.drinks[0].strDrinkThumb
              );
              for (let i = 0; i < 14; i++)
                if (
                  tequilaCocktail.drinks[0][`strIngredient${i}`] &&
                  tequilaCocktail.drinks[0][`strIngredient${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients").append(
                    `<li> ${
                      tequilaCocktail.drinks[0][`strIngredient${i}`]
                    }</li>`
                  );
                } else {
                  $("#cocktail-ingridients").append(" ");
                }
              for (let i = 0; i < 14; i++) {
                if (
                  tequilaCocktail.drinks[0][`strMeasure${i}`] &&
                  tequilaCocktail.drinks[0][`strMeasure${i}`] !== "null"
                ) {
                  $("#cocktail-ingridients li")
                    .eq(i)
                    .prepend(`${tequilaCocktail.drinks[0][`strMeasure${i}`]} `);
                } else {
                  $("#cocktail-ingridients li").eq(i).prepend("");
                }
              }
            }
          );
        }
      }
    );
  }

  // Get the button:
  var mybutton = document.getElementById("myBtn");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  /*******************************************
   * Click event for "Add to favorites" button
   ********************************************/
  $("#faveBtn").on("click", function () {
    $("#save-msg").text("Your cocktail has been saved");
    setTimeout(function () {
      $("#save-msg").text("");
    }, 2000);
    // create an object to store the data
    var cocktailData = {
      title: cocktailTitleEl.text(),
      instructions: instructionsEl.text(),
      image: $("#cocktail-thumb").attr("src"),
      ingredients: $("#cocktail-ingridients")[0].innerHTML,
    };
    console.log(cocktailData);
    // get existing data from local storage incase there are favorites stored
    var cocktailDataArray =
      JSON.parse(localStorage.getItem("cocktailData")) || [];
    // add new data to the array
    cocktailDataArray.push(cocktailData);
    // save the updated array to localStorage
    localStorage.setItem("cocktailData", JSON.stringify(cocktailDataArray));
  }); // end Add to favourite event handler

  /*********************************************
   * Roll again button event handler
   * ********************************************/
  $("#rollAgainBtn").on("click", function () {
    $("#cocktail-ingridients").empty();

    getFeaturedCocktail();
  }); // end Roll again button event handler
}); // end document ready function

// TEST FOR MODAL TO ONLY SHOW ON FIRST PAGE LOAD
$('#myModal1').on('shown.bs.modal', function() {
  localStorage.setItem('modal_displayed', 'true');
});

// Check for local storage on page load
$(document).ready(function() {
  if (localStorage.getItem('modal_displayed') == 'true') {
      $('#myModal1').modal('hide');
  }
});
// end of test

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


