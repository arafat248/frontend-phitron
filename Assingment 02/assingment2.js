const drinkCardsContainer = document.getElementById('drink-cards-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const addedDrinksList = document.getElementById('added-drinks-list');
const totalDrinksSpan = document.getElementById('total-drinks');
const detailsModal = document.getElementById('details-modal');
const modalDetailsContent = document.getElementById('modal-details-content');
const closeButton = document.querySelector('.close-button');

let drinks = [];
let addedDrinks = [];

async function fetchDrinks(searchTerm = '') {
    const apiURL = searchTerm
        ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail';

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        drinks = data.drinks || [];
        displayDrinkCards();
    } catch (error) {
        console.error('Error fetching drinks:', error);
        drinkCardsContainer.innerHTML = "<p>Error fetching drinks. Please try again later.</p>";
    }
}
function displayDrinkCards() {
    drinkCardsContainer.innerHTML = '';

    if (drinks.length === 0) {
        drinkCardsContainer.innerHTML = '<p>No drinks found.</p>';
        return;
    }

    drinks.forEach((drink, index) => {
        const drinkCard = document.createElement('div');
        drinkCard.classList.add('drink-card');
        drinkCard.innerHTML = `
            <img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
            <p>${drink.strCategory || "N/A"}</p>
            <p>${(drink.strInstructions && drink.strInstructions.length > 15) ? drink.strInstructions.slice(0, 15) + "..." : drink.strInstructions || "N/A"}</p>
            <button class="add-to-group-button" data-drink-index="${index}">Add to Card</button>
            <button class="details-button" data-drink-index="${index}">Details</button>
        `;
        drinkCardsContainer.appendChild(drinkCard);
    });
    drinkCardsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-group-button')) {
            addToGroup(event);
        } else if (event.target.classList.contains('details-button')) {
            showDetails(event);
        }
    });
}
function addToGroup(event) {
    const drinkIndex = parseInt(event.target.dataset.drinkIndex);
    const drink = drinks[drinkIndex];

    const isDrinkAlreadyAdded = addedDrinks.some(addedDrink => addedDrink.idDrink === drink.idDrink);

    if (addedDrinks.length < 7 && drink && !isDrinkAlreadyAdded) {
        addedDrinks.push(drink);
        updateAddedDrinksList();
    } else if (addedDrinks.length >= 7) {
        alert('You cannot add more than 7 drinks to a group.');
    } else if (isDrinkAlreadyAdded) {
        alert('This drink is already in the group.');
    }
}
function showDetails(event) {
    const drinkIndex = parseInt(event.target.dataset.drinkIndex);
    const drink = drinks[drinkIndex];

    if (!drink) {
        console.error("Drink details not found.");
        modalDetailsContent.innerHTML = "<p>Drink details not found.</p>";
        detailsModal.style.display = 'block';
        return;
    }
    modalDetailsContent.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="max-width: 200px;">
        <p><strong>Category:</strong> ${drink.strCategory || "N/A"}</p>
        <p><strong>Glass:</strong> ${drink.strGlass || "N/A"}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions || "N/A"}</p>
        <p><strong>Ingredients:</strong> ${getIngredients(drink)}</p>
    `;
    detailsModal.style.display = 'block';
}
function getIngredients(drink) {
    let ingredients = '';
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients += `${measure} ${ingredient}<br>`;
        } else if (ingredient) {
            ingredients += `${ingredient}<br>`;
        }
    }
    return ingredients;
}
function updateAddedDrinksList() {
    addedDrinksList.innerHTML = '';
    addedDrinks.forEach(drink => {
        const drinkItem = document.createElement('div');
        drinkItem.innerHTML = `<img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}" style="max-width: 50px; margin-right: 10px;"> <p style="display:inline-block;">${drink.strDrink}</p>`; // Added image
        addedDrinksList.appendChild(drinkItem);
    });
    totalDrinksSpan.textContent = addedDrinks.length;
}
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    fetchDrinks(searchTerm);
});
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value;
        fetchDrinks(searchTerm);
    }
});
closeButton.addEventListener('click', () => {
    detailsModal.style.display = 'none';
});
fetchDrinks();