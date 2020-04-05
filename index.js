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

const isValidCoordinates = require('is-valid-coordinates')

var inside = require('point-in-polygon')

/**********************get**************************/
app. get('/gis/testpoint?lat=:id_lat,long=:id_long', function (req, res) {
     
    var id_lat = req.params.id_lat;
    var id_long = req.params.id_long;

    inside_polygon=false;

    //check existance of point in polygons 
    for (var i = 0;i<json.features.length; i++) {
        if( inside([ id_lat, id_long ], json.features[i].geometry.coordinates[0]) === true){

            inside_polygon=true;
            res.json(200);

        }
       
    }

    if( inside_polygon===false ){
        res.json(400);
    }


})

/**********************put**************************/
const PORT = process.env.PORT || 5000;

app.put('/gis/addpolygon', function (req, res) {
  
    let data = req.body;
 
    var newGeoJSON = { 
        "type" : "FeatureCollection",
        "features": [... json.features, data]
    }

    data = JSON.stringify(newGeoJSON, null, 2);
    
    fs.writeFileSync('data.json', data);
  
    res.send('Got a PUT request at /user');
})

  app.listen(PORT);
