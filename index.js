const express = require('express')
const app = express()

const dotenv= require("dotenv");
dotenv.config();

app.get('/', (req, res) => 
    res.json({name:"akram"})
       )

app.listen(process.env.port, () => console.log(`Example app listening on port ${process.env.port}!`))