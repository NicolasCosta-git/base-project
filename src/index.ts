import express from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import cors from "cors";

import router from "./routes/router";

dotenv.config();

const port = process.env.PORT;

async function init() {
  try {
    await createConnection();
  } catch (err) {
    console.log(err);
  }

  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.use("/", router);

  app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port} 🔥`);
  });
}

init();
