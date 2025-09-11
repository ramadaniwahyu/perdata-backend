import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected ${conn.connection.host} on ${conn.connection.name}`);
        // console.log('Database connected')
    
    } catch (error) {
        console.log("Error conntecting database", error);
        process.exit(1)
    }
}