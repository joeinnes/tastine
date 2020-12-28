import db from './db';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const ShoppingList = {
  async addItems(items, cb) {
    if (!Array.isArray(items)) {
      items = [ items ];
    }

    await db.open();
    items.forEach(async (item) => {
      if (!Number.isInteger(item.quantity)) {
        item.quantity = parseInt(item.quantity, 10);
      }
      const existingItem = await db.ingredients.get({
        name: item.name
      });

      if (existingItem) {
        this.adjustQty(existingItem.id, item.quantity, cb);
        return;
      }

      const thisItem = {
        name: item.name,
        quantity: item.quantity,
        unit: item.unit
      };
      db.ingredients.put(thisItem);
      this.getAllItems(cb);
    });
    //
  },
  async adjustQty(itemId, quantityChange, cb) {
    await db.open();
    if (!Number.isInteger(quantityChange)) {
      quantityChange = parseInt(quantityChange, 10);
    }
    const item = await db.ingredients.get(itemId);
    const newQty = item.quantity + quantityChange;
    if (newQty < 1) {
      this.removeItems(itemId, cb);
      return;
    }

    await db.ingredients.where('id').equals(itemId).modify({
      quantity: item.quantity + quantityChange
    });
    this.getAllItems(cb);
  },
  async getAllItems(cb) {
    await db.open();
    const ingredients = await db.ingredients.toArray();
    cb(ingredients);
  },
  async removeItems(items, cb) {
    await db.open();
    if (!items) {
      await db.ingredients.clear();
    } else {
      if (!Array.isArray(items)) {
        items = [ items ];
      }
      items.forEach(async (id) => {
        await db.ingredients.where('id').equals(id).delete();
      });
    }
    this.getAllItems(cb);
  }
};

export default ShoppingList;
