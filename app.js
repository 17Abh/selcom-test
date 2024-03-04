import express from "express";
import * as dotenv from "dotenv";
import databaseConfig from "./config/mongodbConfig.js";
import routes from "./routes/index.route.js";

const app = express();

/**
 * Global env variables definition
 */
dotenv.config();

databaseConfig
  .MongoDB(process.env.MONGO_URI || "")
  .catch((err) => console.log({ err }));

/**
 * Parse json request body
 */
app.use(express.json());

/**
 * Routes definitions
 */
app.use("/api/v1/", routes);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Setting up server: ${PORT}`);
});

export default app;
