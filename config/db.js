import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.DATABASE_URL);
    console.log("MongoDB connected :D");
  } catch (error) {
    console.error("MongoDB not connected :C");
  }
};

export default connectDB;
