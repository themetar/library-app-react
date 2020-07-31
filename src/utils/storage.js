/*
  Storage utility
*/

const available = !!(window && window.localStorage);

const storeItem = function storeObject (name, item) {
  if (available) {
    localStorage.setItem(name, JSON.stringify(item));
  }
}

const readItem = function readObject (name) {
  if (available) {
    const data = localStorage.getItem(name);
    if (data)
      return JSON.parse(data);
  }
}

export { storeItem, readItem };
