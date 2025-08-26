import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

if(!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env file");
}

declare global {
  var mongoose: { conn: any, promise: any } | undefined;
}

let cached = global.mongoose;

export default async function connectDB(){
    if (!cached) {
        cached = global.mongoose = { conn: null, promise: null };
    }
    if(cached.conn){
     return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(uri, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB')
        return mongoose
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error.message)
        throw error
      })
    }
    try{
        cached.conn = await cached.promise;
    }catch (e){
        cached.promise = null
        throw e
    }
    return cached.conn;
}