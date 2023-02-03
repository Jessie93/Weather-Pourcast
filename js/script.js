var cocktailTitleEl = $('#cocktail-title')
var instructionsEl = $('#cocktail-instructions')

// function to get a random cocktail on page load and push it onto card
function getFeaturedCocktail() {
    $.get("https:/www.thecocktaildb.com/api/json/v1/1/random.php", function (response) {
        console.log(response);
        console.log(response.drinks[0].strDrinkThumb);
        console.log(response.drinks[0].strDrink);
        cocktailTitleEl.text("Try a " + response.drinks[0].strDrink);
        instructionsEl.text(response.drinks[0].strInstructions);
        $('#cocktail-thumb').attr("src", response.drinks[0].strDrinkThumb);
        console.log(response.drinks[0].strIngredient1);
        console.log(response.drinks[0].strMeasure1);
        for (let i = 0; i < 14; i++)
            if (response.drinks[0][`strIngredient${i}`] && response.drinks[0][`strIngredient${i}`] !== "null") {
                $('#cocktail-ingridients').append(`<li> ${response.drinks[0][`strIngredient${i}`]}</li>`);
            } else {
                $('#cocktail-ingridients').append(" ")
            };
        for (let i = 0; i < 14; i++) {
            if (response.drinks[0][`strMeasure${i}`] && response.drinks[0][`strMeasure${i}`] !== "null") {
                $('#cocktail-ingridients li').eq(i).prepend(`${response.drinks[0][`strMeasure${i}`]} `);
            } else {
                $('#cocktail-ingridients li').eq(i).prepend("")
            };
        }
    })
};

getFeaturedCocktail();

/**************************************************
 * Get weather in user's city
 ****************************************************/


var apiKey = "&appid=430a3842b09d883ae73a59e0c1d18fa2"
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
            var sugestionTitle = $("<h2>")
                .addClass("sugestion-title")
                .text("The Tempreature in " + city + " is " + tempC + "°C.");
            $("#cocktail-card").prepend(sugestionTitle);
        }
updateCard();
runIfStatements();
    });
    
    
});// end of search-btn click event listener

/**************************************************
 * If statements to run different functions based on temperature
 ****************************************************/

function runIfStatements() {   
    if (tempC < 4) {
        getRandomWhiskeyCocktail()
    };
    if (tempC > 3 && tempC < 10) {
        getRandomVodkaCocktail()
    }
    if (tempC > 9 && tempC < 18) {
        getRandomGinCocktail()
    }
    if (tempC > 17 && tempC < 25) {
        getRandomRumCocktail()
    }
    else {
        getRandomTequillaCocktail()
    };
}


/**************************************************
 * Functions for different cocktails based on ingridients
 ****************************************************/

function getRandomWhiskeyCocktail() {
    $.get("https:/www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey", function (response) {
        console.log(response.drinks);
        var randomIndex = response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        function getfullWhiskeyCocktail() {
            $.get("https:/www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + currentCocktail, function (response) {
                var whiskeyCocktail = response
                console.log(whiskeyCocktail)
                console.log(whiskeyCocktail.drinks[0].strDrink)
            })
        }
        getfullWhiskeyCocktail();
        cocktailTitleEl.text("Something warming for this cold day? Try a " + whiskeyCocktail.drinks[0].strDrink);
        instructionsEl.text(whiskeyCocktail.drinks[0].strInstructions);
        $('#cocktail-thumb').attr("src", whiskeyCocktail.drinks[0].strDrinkThumb);
        for (let i = 0; i < 14; i++)
            if (whiskeyCocktail.drinks[0][`strIngredient${i}`] && whiskeyCocktail.drinks[0][`strIngredient${i}`] !== "null") {
                $('#cocktail-ingridients').append(`<li> ${whiskeyCocktail.drinks[0][`strIngredient${i}`]}</li>`);
            } else {
                $('#cocktail-ingridients').append(" ")
            };
        for (let i = 0; i < 14; i++) {
            if (whiskeyCocktail.drinks[0][`strMeasure${i}`] && whiskeyCocktail.drinks[0][`strMeasure${i}`] !== "null") {
                $('#cocktail-ingridients li').eq(i).prepend(`${whiskeyCocktail.drinks[0][`strMeasure${i}`]} `);
            } else {
                $('#cocktail-ingridients li').eq(i).prepend("")
            };
        }
    })
};

function getRandomVodkaCocktail() {
    $.get("https:/www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka", function (response) {
        console.log(response.drinks);
        var randomIndex = response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        function getfullVodkaCocktail() {
            $.get("https:/www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + currentCocktail, function (response) {
                var vodkaCocktail = response
                console.log(vodkaCocktail)
                console.log(vodkaCocktail.drinks[0].strDrink)
            })
        }
        getfullVodkaCocktail();
        cocktailTitleEl.text("Something to brighten up this chilly day? Try a " + vodkaCocktail.drinks[0].strDrink);
        instructionsEl.text(vodkaCocktail.drinks[0].strInstructions);
        $('#cocktail-thumb').attr("src", vodkaCocktail.drinks[0].strDrinkThumb);
        for (let i = 0; i < 14; i++)
            if (vodkaCocktail.drinks[0][`strIngredient${i}`] && vodkaCocktail.drinks[0][`strIngredient${i}`] !== "null") {
                $('#cocktail-ingridients').append(`<li> ${vodkaCocktail.drinks[0][`strIngredient${i}`]}</li>`);
            } else {
                $('#cocktail-ingridients').append(" ")
            };
        for (let i = 0; i < 14; i++) {
            if (vodkaCocktail.drinks[0][`strMeasure${i}`] && vodkaCocktail.drinks[0][`strMeasure${i}`] !== "null") {
                $('#cocktail-ingridients li').eq(i).prepend(`${vodkaCocktail.drinks[0][`strMeasure${i}`]} `);
            } else {
                $('#cocktail-ingridients li').eq(i).prepend("")
            };
        }
    })
};

function getRandomGinCocktail() {
    $.get("https:/www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin", function (response) {
        console.log(response.drinks);
        var randomIndex = response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        function getfullGinCocktail() {
            $.get("https:/www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + currentCocktail, function (response) {
                var ginCocktail = response
                console.log(ginCocktail)
                console.log(ginCocktail.drinks[0].strDrink)
            })
        }
        getfullGinCocktail();
        cocktailTitleEl.text("On this dull day, try a " + ginCocktail.drinks[0].strDrink);
        instructionsEl.text(ginCocktail.drinks[0].strInstructions);
        $('#cocktail-thumb').attr("src", ginCocktail.drinks[0].strDrinkThumb);
        for (let i = 0; i < 14; i++)
            if (ginCocktail.drinks[0][`strIngredient${i}`] && ginCocktail.drinks[0][`strIngredient${i}`] !== "null") {
                $('#cocktail-ingridients').append(`<li> ${ginCocktail.drinks[0][`strIngredient${i}`]}</li>`);
            } else {
                $('#cocktail-ingridients').append(" ")
            };
        for (let i = 0; i < 14; i++) {
            if (ginCocktail.drinks[0][`strMeasure${i}`] && ginCocktail.drinks[0][`strMeasure${i}`] !== "null") {
                $('#cocktail-ingridients li').eq(i).prepend(`${ginCocktail.drinks[0][`strMeasure${i}`]} `);
            } else {
                $('#cocktail-ingridients li').eq(i).prepend("")
            };
        }
    })
};

function getRandomRumCocktail() {
    $.get("https:/www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum", function (response) {
        console.log(response.drinks);
        var randomIndex = response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        function getfullRumCocktail() {
            $.get("https:/www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + currentCocktail, function (response) {
                var rumCocktail = response
                console.log(rumCocktail)
                console.log(rumCocktail.drinks[0].strDrink)
            })
        }
        getfullRumCocktail();
        cocktailTitleEl.text("Something to suit this warm day? Try a " + rumCocktail.drinks[0].strDrink);
        instructionsEl.text(rumCocktail.drinks[0].strInstructions);
        $('#cocktail-thumb').attr("src", rumCocktail.drinks[0].strDrinkThumb);
        for (let i = 0; i < 14; i++)
            if (rumCocktail.drinks[0][`strIngredient${i}`] && rumCocktail.drinks[0][`strIngredient${i}`] !== "null") {
                $('#cocktail-ingridients').append(`<li> ${rumCocktail.drinks[0][`strIngredient${i}`]}</li>`);
            } else {
                $('#cocktail-ingridients').append(" ")
            };
        for (let i = 0; i < 14; i++) {
            if (rumCocktail.drinks[0][`strMeasure${i}`] && rumCocktail.drinks[0][`strMeasure${i}`] !== "null") {
                $('#cocktail-ingridients li').eq(i).prepend(`${rumCocktail.drinks[0][`strMeasure${i}`]} `);
            } else {
                $('#cocktail-ingridients li').eq(i).prepend("")
            };
        }
    })
};

function getRandomTequillaCocktail() {
    $.get("https:/www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequilla", function (response) {
        console.log(response.drinks);
        var randomIndex = response.drinks[Math.floor(Math.random() * response.drinks.length)];
        console.log(randomIndex.idDrink);
        currentCocktail = randomIndex.idDrink;
        function getfullTequillaCocktail() {
            $.get("https:/www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + currentCocktail, function (response) {
                var tequillaCocktail = response
                console.log(tequillaCocktail)
                console.log(tequillaCocktail.drinks[0].strDrink)
            })
        }
        getfullTequillaCocktail();
        cocktailTitleEl.text("On this hot day, try a " + tequillaCocktail.drinks[0].strDrink);
        instructionsEl.text(tequillaCocktail.drinks[0].strInstructions);
        $('#cocktail-thumb').attr("src", tequillaCocktail.drinks[0].strDrinkThumb);
        for (let i = 0; i < 14; i++)
            if (tequillaCocktail.drinks[0][`strIngredient${i}`] && tequillaCocktail.drinks[0][`strIngredient${i}`] !== "null") {
                $('#cocktail-ingridients').append(`<li> ${tequillaCocktail.drinks[0][`strIngredient${i}`]}</li>`);
            } else {
                $('#cocktail-ingridients').append(" ")
            };
        for (let i = 0; i < 14; i++) {
            if (tequillaCocktail.drinks[0][`strMeasure${i}`] && tequillaCocktail.drinks[0][`strMeasure${i}`] !== "null") {
                $('#cocktail-ingridients li').eq(i).prepend(`${tequillaCocktail.drinks[0][`strMeasure${i}`]} `);
            } else {
                $('#cocktail-ingridients li').eq(i).prepend("")
            };
        }
    })
};
