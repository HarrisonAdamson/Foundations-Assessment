require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
app.use(express.json());

const {seed, getRating, createRating, deleteRating} = require('./controller.js')

app.use(cors());

app.post('/seed', seed)

app.post('/ratings', createRating)
app.get('/ratings', getRating)
app.delete('/ratings/:id', deleteRating)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))