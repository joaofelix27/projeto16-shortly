import express from "express";
import cors from 'cors'
import router from "./routers/index.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

app.listen (5000, () => {console.log(`Server listen on Port 5000`)})


