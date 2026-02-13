import { MongoClient } from "mongodb";

let cachedClient = null;

async function savePassword(db, site, username, password) {
  await db.collection("passwords").insertOne({
    site,
    username,
    password,
    createdAt: new Date(),
  });
}

async function getPasswords(db) {
  return await db.collection("passwords").find({}).toArray();
}

async function updatePassword(db, id, newPassword) {
  await db.collection("passwords").updateOne(
    { _id: id },
    { $set: { password: newPassword, updatedAt: new Date() } }
  );
}

async function deletePassword(db, id) {
  await db.collection("passwords").deleteOne({ _id: id });
}


async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(process.env.MONGODB_URI); // use env variable
  await client.connect();

  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db("passworddb"); // your database name
  // ...rest of your function
}
