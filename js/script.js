$(document).ready(function () {
    var cocktailTitleEl = $('#cocktail-title')
    var instructionsEl = $('#cocktail-instructions')



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
        $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure1 + " - " + response.drinks[0].strIngredient1 + '</li>');
        $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure2 + " - " + response.drinks[0].strIngredient2 + '</li>');
        if (response.drinks[0].strIngredient3 !== "null") {
            $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure3 + " - " + response.drinks[0].strIngredient3 + '</li>')
        };
        if (response.drinks[0].strIngredient4 && response.drinks[0].strIngredient4 !== "null") {
            $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure4 + " - " + response.drinks[0].strIngredient4 + '</li>')
        };
        if (response.drinks[0].strIngredient5 && response.drinks[0].strIngredient5 !== "null") {
            $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure5 + " - " + response.drinks[0].strIngredient5 + '</li>')
        };
        if (response.drinks[0].strIngredient6 && response.drinks[0].strIngredient6 !== "null") {
            $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure6 + " - " + response.drinks[0].strIngredient6 + '</li>')
        };
        if (response.drinks[0].strIngredient7 && response.drinks[0].strIngredient7 !== "null") {
            $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure7 + " - " + response.drinks[0].strIngredient7 + '</li>')
        };
        if (response.drinks[0].strIngredient8 && response.drinks[0].strIngredient8 !== "null") {
            $('#cocktail-ingridients').append('<li>' + response.drinks[0].strMeasure8 + " - " + response.drinks[0].strIngredient8 + '</li>')
        };
        $('#cocktail-card').append('<h5>' + "Or enter your postcode to get a suggestion tailored to the weather where you are!" + '</h5>');







            //   if (response.drinks[0].strMeasure1 != "null") {
            //     $('#cocktail-ingredients').append(`<li>${response.drinks[0].strMeasure1} ${response.drinks[0].strIngredient1}</li>`);
            //   }
            //   if (response.drinks[0].strMeasure2 != "null") {
            //     $('#cocktail-ingredients').append(`<li>${response.drinks[0].strMeasure2} ${response.drinks[0].strIngredient2}</li>`);
            //   }
            //   if (response.drinks[0].strMeasure3 != "null") {
            //     $('#cocktail-ingredients').append(`<li>${response.drinks[0].strMeasure3} ${response.drinks[0].strIngredient3}</li>`);
            //   }


        

        });
    }

    getFeaturedCocktail();
    /**************************************************
     * Get weather in user's city
    ****************************************************/

    var apiKey = "&appid=430a3842b09d883ae73a59e0c1d18fa2"
    var city;
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

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
                var tempC = (tempK - 273.15).toFixed(2); // converts default Kelvin temperature to Celcius
                var sugestionTitle = $("<h2>")
                    .addClass("sugestion-title")
                    .text("The tempreature in " + city + " is " + tempC + "°C.");
                $("#cocktail-card").prepend(sugestionTitle);
            }
            updateCard();
        }); 

        
        
    });// end of click event listener
        
   

}); // end document.ready function








      // cocktailTitleEl.text(response.strDrink.value);
        //   $(".cocktail-title").text(data.strDrink);
        //   $(".cocktail-instructions").text(data.strInstructions);
        //   $(".cocktail-thumb").attr("src", data.strDrinkThumb);
        //   $(".ingridient").empty();
        //   $(".ingridient").append("<li>" + data.strIngredient1 + "</li>");
        //   $(".ingridient").append("<li>" + data.strIngredient2 + "</li>");

/* <section class="card row flex-row-reverse cocktail-card bg-light">
        <img class="col-lg-4 card-img-end img-fluid p-0 cocktail-thumb" src="images/cocktail-image-example.jpg" />
        <div class="col-lg-8 card-body">
            <h2 class="card-title cocktail-title">Cocktail Title</h2>
            <p class="card-text cocktail-instructions">Intructions for cocktail goes here</p>
            <ul class="list-group-flush cocktail-ingridients">
                <li class="ingridient">First ingridient</li>
                <li class="ingridient">Second ingridient</li>
            </ul>
            <button class="btn custom-color" id="faveBtn">Add to favourites</button>
            <button class="btn custom-color" id="rollAgainBtn">Roll again</button>
        </div>
   /* // </section> */
