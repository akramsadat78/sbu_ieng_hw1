/**********************require**************************/
const express = require('express')
const app = express()

const dotenv= require("dotenv");
dotenv.config();

const fs = require('fs');

var json = require('./data.json');

var geojsonMerge = require('@mapbox/geojson-merge');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**********************get**************************/
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

/**********************put**************************/
let port = process.env.PORT;

app.put('/gis/addpolygon', function (req, res) {
  
    let data = JSON.stringify(req.body, null, 2);

    var newGeoJSON = { 
        "type" : "FeatureCollection",
        "features": [... json.features, data]
    }

    data = JSON.stringify(newGeoJSON, null, 2);

    fs.writeFileSync('data.json', data);
    
    res.send('Got a PUT request at /user');
})

if (port == null || port == "") {
    port = 3000;
  }
  app.listen(port);

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))