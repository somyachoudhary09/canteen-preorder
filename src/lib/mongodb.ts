import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "canteen-preorder";

let cachedClient: MongoClient | null = null;

export async function getOrdersCollection() {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined. Set it in your environment to enable database storage.");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await cachedClient.connect();
  }

  const db = cachedClient.db(dbName);
  return db.collection("orders");
}
