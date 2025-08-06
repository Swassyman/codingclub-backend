import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.DATABASE_URL);
    console.log("MongoDB connected :D");
  } catch (error) {
    console.log("MongoDB not connected :C");
  }
};

export default connectDB;
