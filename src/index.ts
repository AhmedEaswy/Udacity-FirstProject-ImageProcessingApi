import express from 'express'
import * as dotenv from 'dotenv'

// importing routes
import convertRoute from './routes/resize'

// using dotenv
dotenv.config()

// Using express
const app = express()
const PORT = process.env.PORT || 3000

// start routing
app.use(convertRoute)

// Express Server Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))

export default app
