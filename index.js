const express = require('express')
const app = express()

const dotenv= require("dotenv");
dotenv.config();

app.get('/gis/testpoint?lat=:id,long=:id', (req, res) => 
    res.json(
        {
            polygons : [
                'استان تهران' ,
                 'شهر تهران' , 
                 'منطقه ۳'
            ]
        }
    )
       )

app.listen(process.env.port, () => console.log(`Example app listening on port ${process.env.port}!`))