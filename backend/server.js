import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()  
const app = express()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT 

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
  })
