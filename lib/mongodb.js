import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to avoid creating multiple clients
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = global._mongoClientPromise = client.connect();
  }
} else {
  // In production mode, create a new client each time
  clientPromise = client.connect();
}

export default clientPromise;
