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

// function to get a RandomVodkaCocktail and push values onto card
// need to add an if statement about when it should run once weather API is connected
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
    })}
    getfullVodkaCocktail();
    cocktailTitleEl.text("Try a " + vodkaCocktail.drinks[0].strDrink);
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
})};

// add if statements here after weather API Added:
// after user hits "enter" button
// if (response.weather.value = "overcast" or "cloudy" etc.) {
//     getRandomVodkaCocktail
// }
// if (response.weather.value = "sun" or "clear sky" etc.) {
//     getRandomTequillaCocktail
// }
// if (response.weather.value = "rain" or "moderate rain" etc.) {
    //     getRandomWhiskeyCocktail
    // }