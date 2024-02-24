import mongoose from "mongoose";
 
function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
      console.log("Connected to db: ", process.env.MONGODB_CONNECTION_STRING);
    });
  } catch (err) {
    console.log(err);
  }
}

export default connectDB;
