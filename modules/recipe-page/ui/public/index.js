const allButtons = document.querySelectorAll('button.add-ingredients-to-shopping-list');
allButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const recipe = e.target.dataset.recipe;
    const recipeEls = document.querySelectorAll(`[data-recipe=${recipe}]:not(button)`);
    const ingredients = {};
    recipeEls.forEach(el => {
      if (!ingredients[el.dataset.ingredient]) {
        ingredients[el.dataset.ingredient] = {};
      }
      ingredients[el.dataset.ingredient][el.name] = el.value;
    });
    const ingredientList = [];
    for (const [ key, value ] of Object.entries(ingredients)) {
      ingredientList.push(value);
    }
    window.addIngredientsToShoppingList(ingredientList);
  });
})
;
