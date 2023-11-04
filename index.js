import path from "path";
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";
const swaggerDocument = YAML.load('./swagger.yaml');

import cors from "cors";
import dotenv from 'dotenv';
import express from "express";

import UserRoute from "./Routes/UserRoute.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.render('index'));

app.use(UserRoute);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/*', (req, res) => res.redirect('/'));

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));