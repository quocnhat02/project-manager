import mongoose from "mongoose";

const dbConnect = async() => {
    try{
        mongoose.set("strictQuery", false);
        const connected = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected ${connected.connection.host}`);
    }catch (err){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default dbConnect;
