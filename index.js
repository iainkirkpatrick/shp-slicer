console.log('hello');

var React = require('react');
var Map = require('./map')

//testing
var geojson = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [174.77624, -41.28646]
    },
    "properties": {
      "title": "Mapbox DC",
      "description": "1714 14th St NW, Washington DC",
      "marker-color": "#fc4353",
      "marker-size": "large",
      "marker-symbol": "monument"
    }
  }
]

React.render(<Map geojson={geojson}/>, document.body)
