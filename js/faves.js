/* 
// retrieve the data from localStorage
var cocktailData = JSON.parse(localStorage.getItem('cocktailData'));
console.log(cocktailData);


// create the card
var cardHTML = `
    <div class="card m-2">
        <img src="${cocktailData.image}" class="card-img-top">
        <div class="card-body">
            <h2 class="card-title">${cocktailData.title}</h2>
            <ul class="card-text">
                ${cocktailData.ingredients}
            </ul>
            <p class="card-text">${cocktailData.instructions}</p>   
        </div>
        
    </div>
`;

// append the card to the #favorites-container
$('#favorites-container').append(cardHTML);

// create a delete buttton and append it to cardHTML
var delBtn = $("<button>")
    .addClass("btn custom-color btn-sm")
    .attr("id", "del-btn")
    .appendTo(".card-body");

delBtn.text("Delete");




// Click handler for delete button 
$("#del-btn").on("click", function () {
    localStorage.clear(); // clear local storage
    window.location.reload(); // clears all favorites

    //TODO: Try to see if you could add more than one favourite cocktail. 
    //Todo: If you have more than one cocktail stored to local storage see if you could delete one and let the others remain. 
    //Todo: If this works, delete window.location.reload();
}); */


// retrieve the data from localStorage
var cocktailDataArray = JSON.parse(localStorage.getItem("cocktailData")) || [];
console.log(cocktailDataArray);

// show only the first 5 favorites
var numFave = cocktailDataArray.length > 5 ? 5 : cocktailDataArray.length;

for (var i = 0; i < numFave; i++) {
  // create the card
  var cardHTML = `
    <div class="card m-2">
      <img src="${cocktailDataArray[i].image}" class="card-img-top">
      <div class="card-body">
        <h2 class="card-title">${cocktailDataArray[i].title}</h2>
        <ul class="card-text">
          ${cocktailDataArray[i].ingredients}
        </ul>
        <p class="card-text">${cocktailDataArray[i].instructions}</p>
      </div>
    </div>
  `;

  // append the card to the #favorites-container
  $("#favorites-container").append(cardHTML);
}

// create a delete buttton and append it to cardHTML
var delBtn = $("<button>")
    .addClass("btn custom-color btn-sm del-btn")
    .appendTo(".card-body");

delBtn.text("Delete");




// Click handler for delete button 
$(".del-btn").on("click", function (event) {
    /* //localStorage.clear(); // clear local storage
    event.target.localStorage.clear();
    event.target.cardHTML.remove();
    //window.location.reload(); // clears all favorites */

    cocktailDataArray = JSON.parse(localStorage.getItem("cocktailData") || []);
    var index = $(".del-btn").index(this);
    cocktailDataArray.splice(index, 1);
    localStorage.setItem("cocktailData", JSON.stringify(cocktailDataArray));
    console.log(cocktailDataArray);
    $(this).parent(".card").remove();
    //$(this).localStorage.removeItem(); // This line produces an error

    //TODO: Try to see if you could add more than one favourite cocktail. 
    //Todo: If you have more than one cocktail stored to local storage see if you could delete one and let the others remain. 
    //Todo: If this works, delete window.location.reload();
}); 