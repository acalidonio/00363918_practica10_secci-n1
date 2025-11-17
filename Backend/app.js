import express from "express";
import cors from "cors";
import pkg from "body-parser";

const { json, urlencoded } = pkg;
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

import mainRouter from "./routes/index.routes.js";
app.use(mainRouter);

export default app;
