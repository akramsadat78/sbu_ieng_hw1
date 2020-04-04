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


const fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var json = require('./data.json');
var geojsonMerge = require('@mapbox/geojson-merge');
app.put('/gis/addpolygon', function (req, res) {
  
   // console.log(json);
    let da = JSON.stringify(req.body, null, 2);


    var newGeoJSON = { 
        "type" : "FeatureCollection",
        "features": [... json.features, da]
    }

    console.log(newGeoJSON);

    let d = JSON.stringify(newGeoJSON, null, 2);

    fs.writeFileSync('data.json', d);

  res.send('Got a PUT request at /user');
})
 

app.listen(process.env.port, () => console.log(`Example app listening on port ${process.env.port}!`))