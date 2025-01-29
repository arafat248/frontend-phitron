const drinks = [
    { name: "Margarita", category: "Cocktail", instructions: "Shake and strain into a chilled glass.", info: "Originated in Mexico with tequila, lime, and Cointreau." },
    { name: "Mojito", category: "Cocktail", instructions: "Muddle mint leaves, lime, and sugar.", info: "Refreshing Cuban cocktail with rum, mint, and lime." },
    { name: "Old Fashioned", category: "Cocktail", instructions: "Stir with ice, strain, and garnish.", info: "Classic American cocktail with whiskey and bitters." },
    { name: "Negroni", category: "Cocktail", instructions: "Stir with ice and strain into glass.", info: "Italian aperitif with gin, vermouth, and Campari." },
    { name: "Daiquiri", category: "Cocktail", instructions: "Shake with ice and strain into glass.", info: "Rum-based cocktail originating from Cuba." },
    { name: "Cosmopolitan", category: "Cocktail", instructions: "Shake with ice and strain into glass.", info: "Citrusy cocktail with vodka and cranberry." },
    { name: "Martini", category: "Cocktail", instructions: "Stir with ice and strain into glass.", info: "Elegant drink served with gin or vodka." },
    { name: "Pina Colada", category: "Cocktail", instructions: "Blend with ice until smooth.", info: "Tropical drink with rum, pineapple, and coconut." }
  ];

  const drinkContainer = document.getElementById("drinkContainer");
  const groupList = document.getElementById("groupList");
  const drinkCountEl = document.getElementById("drinkCount");
  const modal = document.getElementById("drinkModal");
  const modalContent = document.getElementById("modalContent");
  let drinkCount = 0;

  function renderDrinks(filteredDrinks = drinks) {
    drinkContainer.innerHTML = "";
    if (filteredDrinks.length === 0) {
      drinkContainer.innerHTML = `<p>No drinks found.</p>`;
      return;
    }

    filteredDrinks.forEach(drink => {
      const card = document.createElement("div");
      card.classList.add("drink-card");
      card.innerHTML = `
        <div class="drink-name">${drink.name}</div>
        <div class="category">Category: ${drink.category}</div>
        <div class="instructions">Instructions: ${drink.instructions.slice(0, 15)}...</div>
        <div class="buttons">
          <button onclick="addToGroup('${drink.name}')">Add to Group</button>
          <button class="details-btn" onclick="showDetails('${drink.info}')">Details</button>
        </div>
      `;
      drinkContainer.appendChild(card);
    });
  }

  function addToGroup(drinkName) {
    if (drinkCount >= 7) {
      alert("Cannot add more than 7 drinks to the group.");
      return;
    }
    const listItem = document.createElement("li");
    listItem.textContent = drinkName;
    groupList.appendChild(listItem);
    drinkCount++;
    updateDrinkCount();
  }

  function updateDrinkCount() {
    drinkCountEl.textContent = `Drink Count: ${drinkCount}`;
  }

  function showDetails(info) {
    modalContent.textContent = info;
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  document.getElementById("searchBtn").addEventListener("click", () => {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredDrinks = drinks.filter(drink => drink.name.toLowerCase().includes(searchValue));
    renderDrinks(filteredDrinks);
  });

  // Initial rendering of drinks
  renderDrinks();