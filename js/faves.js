
// retrieve the data from localStorage
var cocktailData = JSON.parse(localStorage.getItem('cocktailData'));
console.log(cocktailData);

// create the card
var cardHTML = `
    <div class="card m-2">
        <img src="${cocktailData.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${cocktailData.title}</h5>
            <ul class="card-text">
                ${cocktailData.ingredients}
            </ul>
            <p class="card-text">${cocktailData.instructions}</p>
        </div>
    </div>
`;

// append the card to the #favorites-container
$('#favorites-container').append(cardHTML);