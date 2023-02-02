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
            $('#cocktail-card').append('<h5>' + "Or enter your postocode to get a suggestion tailored to the weather where you are!" + '</h5>');
  
  
  
  
  
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
    
    });// end of search-btn click event listener
  
    
    $("#fav-btn").on("click", function(event) {
        getFeaturedCocktail()
        createElements();
        
        // Create and append elements in favourite.html for the favourite cocktail
        function createElements() {
            // Create elements and assign them to variables
            var containerEl = $("<div>")
                .addClass("container");
            var sectionEl = $("<section>")
                .addClass("card row flex-row-reverse cocktail-card bg-light");
            var imageEl = $("<img>")
                .addClass("col-lg-4 card-img-end img-fluid p-0 cocktail-thumb");
            var cardBodyEl = $("<div>")
                .addClass("col-lg-8 card-body");
            var cardTitleEl = $("<h2>")
                .addClass("card-title cocktail-title");
            var cardTextEl = $("<p>")
                .addClass("card-text cocktail-instructions");
            var ingredientsListUlEl = $("<ul>")
                .addClass("list-group-flush cocktail-ingridients");
            var ingridientItemLiEl = $("<li>")
                .addClass("ingridient");
            var delBtnEl = $("<div>")
                .addClass("btn custom-color")
                .attr("id", "delBtn");
  
            // Append elements to the page
            $("body").append(containerEl);
            containerEl.append(sectionEl);
            sectionEl.append(imageEl, cardBodyEl);
            cardBodyEl.append(cardTitleEl, cardTextEl, ingredientsListUlEl, delBtnEl);
            ingredientsListUlEl.append(ingridientItemLiEl);
  
            // Function to get data from index.html
        function getData() {
           
        }
  
        }
  
        
    });
        
   
  
  }); // end document.ready function
  
  
  
  
  
  
  
  
  

  
  








