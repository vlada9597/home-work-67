import { getDB } from '../config/db.js';

// Читання документів
export async function getItems(req, res) {
  try {
    const { projection } = req.query;
    const proj = projection ? JSON.parse(projection) : {};
    const items = await getDB().collection('items').find({}, { projection: proj }).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Створення одного документа
export async function addItem(req, res) {
  try {
    const result = await getDB().collection('items').insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Створення багатьох документів
export async function addManyItems(req, res) {
  try {
    const result = await getDB().collection('items').insertMany(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Оновлення одного документа
export async function updateItem(req, res) {
  try {
    const { filter, update } = req.body;
    const result = await getDB().collection('items').updateOne(filter, { $set: update });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Оновлення багатьох документів
export async function updateManyItems(req, res) {
  try {
    const { filter, update } = req.body;
    const result = await getDB().collection('items').updateMany(filter, { $set: update });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Замінити один документ
export async function replaceItem(req, res) {
  try {
    const { filter, replacement } = req.body;
    const result = await getDB().collection('items').replaceOne(filter, replacement);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Видалення одного документа
export async function deleteItem(req, res) {
  try {
    const { filter } = req.body;
    const result = await getDB().collection('items').deleteOne(filter);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Видалення багатьох документів
export async function deleteManyItems(req, res) {
  try {
    const { filter } = req.body;
    const result = await getDB().collection('items').deleteMany(filter);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
