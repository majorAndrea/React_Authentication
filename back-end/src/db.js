import { MongoClient } from 'mongodb';

let client;
const mongoURI = process.env.MONGODB_URI;

export const initializeDbConnection = async () => {
  client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}