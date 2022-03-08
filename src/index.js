import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use('/person', routes.person);

// Start

app.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
