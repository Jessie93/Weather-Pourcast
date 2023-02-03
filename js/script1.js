var cocktailTitleEl = $('#cocktail-title')
var instructionsEl = $('#cocktail-instructions')

function getFeaturedCocktail() {
    $.get("https:/www.thecocktaildb.com/api/json/v1/1/random.php", function (response)
    {
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
    }    })
};



getFeaturedCocktail();