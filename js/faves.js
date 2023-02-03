
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

    //TODO: Try to see if you could add more than one favourite cocktail. If you have morre than one cocktail stored to local storage see if you could delete one and let the others remain
});