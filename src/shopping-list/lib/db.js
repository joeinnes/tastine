import Dexie from 'dexie';

const db = new Dexie('shopping_list');
db.version(1).stores({
  ingredients: '++id,name,quantity,unit'
});

export default db;
