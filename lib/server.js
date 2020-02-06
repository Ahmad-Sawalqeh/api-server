/* eslint-disable strict */
'use strict';

const express = require('express');
// const uuid = require('uuid/v4');
const Model = require('../memory-data-model.js');
const { timestamp, logger } = require('./logger.js');

const app = express();

app.use(express.json());
app.use(timestamp);
app.use(logger);
app.use(errorHandler);

app.get('/testerror', errorHandler);

let CRUDforCategories = new Model;
let CRUDforProducts = new Model;
// let dbCate = [];
// let db = [];

/********** Categories Routes *********/
app.get('/categories', getCategoriesTest);

app.get('/api/v1/categories', getApiCategories);
app.get('/api/v1/categories/:id', getOneCategory);
app.post('/api/v1/categories', addCategory);
app.put('/api/v1/categories/:id', updateCategory);
app.delete('/api/v1/categories/:id', deleteCategory);

/********** products Routes *********/
app.get('/products', getProductsTest);

app.get('/api/v1/products', getApiProducts);
app.get('/api/v1/products/:id', getOneProduct);
app.post('/api/v1/products', addProduct);
app.put('/api/v1/products/:id', updateProduct);
app.delete('/api/v1/products/:id', deleteProduct);

/******* Categories/products testing functions *******/

// http://localhost:3000/categories?name=ahmad_sawalqeh&displayName=computer_engineer
function getCategoriesTest(req, res) {

  console.log('categories request obj:', req.query);

  let categoriesOutput = {
    name: req.query.name,
    displayName: req.query.displayName,
  };
  res.status(200).json(categoriesOutput);
}

// http://localhost:3000/products?type=computerengineer
function getProductsTest(req, res) {

  console.log('products request obj:', req.query);

  let output = {
    type: req.query.type,
    thisWorked: true,
  };
  res.status(200).json(output);
}

/***************************  Api functions ****************************/

/**************** categories functions ****************/

// http://localhost:3000/api/v1/categories
function getApiCategories(req, res) {
  // let count = dbCate.length;
  // let results = dbCate;
  // res.json({ count, results });
  let CRUDCategorieCount = CRUDforCategories.database.length;
  let CRUDCategorieResult = CRUDforCategories.database;
  res.json({ CRUDCategorieCount, CRUDCategorieResult });
}

// http://localhost:3000/api/v1/categories/1
function getOneCategory(req, res) {
  // req.params === ['23']
  // req.params.id === '23'
  let id = req.params.id;
  // let record = dbCate.filter((record) => record.id === parseInt(id));
  // res.json(record);
  CRUDforCategories.get(id)
    .then((record) => {
      res.json(record);
    });
}

// http://localhost:3000/api/v1/categories
function addCategory(req, res) {
  let { name } = req.body; // req.body.name
  let record = { name };
  // record.id = dbCate.length + 1;
  // dbCate.push(record);
  // res.status(201).json(record);
  CRUDforCategories.create(record,record.id)
    .then((record) => {
      res.status(201).json(record);
    });
}

// http://localhost:3000/api/v1/categories/2
function updateCategory(req, res) {
  let { name, id } = req.body;
  // let idToUpdate = req.params.id;
  // let updatedRecord = { id, name };
  // dbCate = dbCate.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  // res.json(updatedRecord);
  CRUDforCategories.update(id, name)
    .then((updatedRecord) => {
      res.json(updatedRecord);
    });
}

// http://localhost:3000/api/v1/categories/2
function deleteCategory(req, res) {
  let id = req.params.id;
  // dbCate = dbCate.filter((record) => record.id !== parseInt(id));
  // res.json({ msg: 'catogery deleted' });
  CRUDforCategories.delete(id)
    .then(() => {
      res.json({ msg: 'catogery deleted' });
    });
}


/**************** products functions ****************/

// http://localhost:3000/api/v1/products
function getApiProducts(req, res) {
  // let count = db.length;
  // let results = db;
  // res.json({ count, results });
  let CRUDproductCount = CRUDforProducts.database.length;
  let CRUDproductResult = CRUDforProducts.database;
  res.json({ CRUDproductCount, CRUDproductResult });
}

// http://localhost:3000/api/v1/products/1
function getOneProduct(req, res) {
  // req.params === ['23']
  // req.params.id === '23'
  let id = req.params.id;
  // let record = db.filter((record) => record.id === parseInt(id));
  // res.json(record);
  CRUDforProducts.get(id)
    .then((record) => {
      res.json(record);
    });
}

// http://localhost:3000/api/v1/products
function addProduct(req, res) {
  let { name } = req.body; // req.body.name
  let record = { name };
  // record.id = db.length + 1;
  // db.push(record);
  // res.status(201).json(record);
  CRUDforProducts.create(record,record.id)
    .then((record) => {
      res.status(201).json(record);
    });
}

// http://localhost:3000/api/v1/products/2
function updateProduct(req, res) {
  let { name, id } = req.body;
  // let idToUpdate = req.params.id;
  // let updatedRecord = { name, id };
  // db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  // res.json(updatedRecord);
  CRUDforProducts.update(name,id)
    .then((updatedRecord) => {
      res.json(updatedRecord);
    });
}

// http://localhost:3000/api/v1/products/2
function deleteProduct(req, res) {
  let id = req.params.id;
  // db = db.filter((record) => record.id !== parseInt(id));
  // res.json({ msg: 'product deleted' });
  CRUDforProducts.delete(id)
    .then(() => {
      res.json({ msg: 'product deleted' });
    });
}

/***************************  Error middleware ****************************/
app.get('/testerror', (req, res) => {
  throw new Error('My own error');// errors will break the whole application process
});

app.use('*', notFoundHandler);

function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found!';
  res.json({ error: 'Not Found'});
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Server Error!';
  res.json({ error: err });
}


/*************************** listen server ****************************/

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  },
};
