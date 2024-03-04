import mongoose from "mongoose";

export default {
  MongoDB: async (URI) => {
    try {
      await mongoose.connect(URI);
      console.log(`Connected to db: ${mongoose.connection.name}`);
    } catch (error) {
      log(error);
      throw new Error(error.message);
    }
  },
};
