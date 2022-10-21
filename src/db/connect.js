import mongoose from "mongoose";

const connect = async ()=> mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
try {
    db = await connect();
    console.log("mongodb connected");
}catch(error){
    console.log(error);
}

export default db;