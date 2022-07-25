import express from "express";
import * as dotenv from 'dotenv';
// import morgan from 'morgan';
import path from 'path'

// importing routes
import convertRoute from './routes/resize'

// using dotenv
dotenv.config();

// Using express
const app = express();
const PORT = process.env.PORT || 3000;

// using morgan
// app.use(morgan('dev'))

// start routing
app.use(convertRoute)


// Express Server Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
