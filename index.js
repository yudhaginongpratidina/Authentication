import cors from "cors";
import dotenv from 'dotenv';
import express from "express";

import UserRoute from "./Routes/UserRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRoute);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));