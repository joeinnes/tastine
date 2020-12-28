// So the CSS is part of the bundle
import './index.scss';
import ShoppingList from './lib/shoppingList';

const toggleShoppingList = () => {
  document.querySelector('#shopping-list').classList.toggle('translate-x-full');
  document.querySelectorAll('.shopping-list-arrow').forEach(arrow => arrow.classList.toggle('rotate-180'));
};

document.querySelector('#toggle-shopping-list').addEventListener('click', toggleShoppingList);

document.querySelector('#clear-shopping-list').addEventListener('click', () => ShoppingList.removeItems(null, updateShoppingList));

document.querySelector('#add-sample').addEventListener('click', () => {
  ShoppingList.addItems([ {
    name: 'Cheese',
    quantity: 1,
    unit: 'slice'
  }, {
    name: 'Bread',
    quantity: 2,
    unit: 'slice'
  } ], updateShoppingList);
});
/* ; */

const updateShoppingList = (items = []) => {
  const shoppingList = document.querySelector('#ingredients-to-buy');
  const newList = document.createElement('ul');
  newList.classList.add('w-full');
  newList.id = 'ingredients-to-buy';
  items.forEach(item => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');
    const deleteText = document.createTextNode('-');
    const addText = document.createTextNode('+');
    const qtyIndicator = document.createElement('span');
    const quantity = document.createTextNode(item.quantity);
    const addButton = document.createElement('button');
    const quantityControls = document.createElement('div');

    qtyIndicator.appendChild(quantity);
    qtyIndicator.classList.add('w-6', 'text-center');

    addButton.appendChild(addText);
    addButton.addEventListener('click', () => {
      ShoppingList.adjustQty(item.id, 1, updateShoppingList);
    });
    addButton.classList.add('border-l', 'border-black', 'px-2');

    deleteButton.appendChild(deleteText);
    deleteButton.addEventListener('click', () => {
      ShoppingList.adjustQty(item.id, -1, updateShoppingList);
    });
    deleteButton.classList.add('border-r', 'border-black', 'px-2');

    quantityControls.classList.add('flex', 'bg-white', 'border', 'border-black', 'rounded');
    quantityControls.appendChild(deleteButton);
    quantityControls.appendChild(qtyIndicator);
    quantityControls.appendChild(addButton);

    const itemText = document.createElement('span');
    itemText.classList.add('w-full', 'ingredient-item');
    const ingredientItem = document.createTextNode(item.name);
    itemText.appendChild(ingredientItem);

    listItem.classList.add('flex', 'w-full', 'my-1');
    checkbox.type = 'checkbox';
    checkbox.classList.add('mr-2', 'flex-grow-0');
    listItem.appendChild(checkbox);
    listItem.appendChild(itemText);
    listItem.appendChild(quantityControls);
    newList.appendChild(listItem);
  });
  shoppingList.parentElement.appendChild(newList);
  shoppingList.remove();
};
ShoppingList.getAllItems(updateShoppingList);

window.addIngredientsToShoppingList = (ingredients) => ShoppingList.addItems(ingredients, updateShoppingList);
