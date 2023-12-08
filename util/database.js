const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://mayyusan:kbODXCsIy6MSE6GH@cluster11.bqjomji.mongodb.net/?retryWrites=true&w=majority";

// db
let _db;

const mongoConnect = async () => {
  // Connect to your Atlas cluster
  const client = new MongoClient(url);
  try {
    const result = await client.connect();
    _db = client.db("shop");
    return result;
  } catch (err) {
    console.log(err.stack);
  } 
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

module.exports = {
  mongoConnect,
  getDB,
};
