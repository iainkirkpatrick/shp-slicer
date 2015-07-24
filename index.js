console.log('hello');

var React = require('react');
var Rx = require('rx');
var Map = require('./map')
var Shp = require('shpjs');

//testing
// var geojson = [
//   {
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [174.77624, -41.28646]
//     },
//     "properties": {
//       "title": "Mapbox DC",
//       "description": "1714 14th St NW, Washington DC",
//       "marker-color": "#fc4353",
//       "marker-size": "large",
//       "marker-symbol": "monument"
//     }
//   }
// ];
var geojson;
var data = Shp("shapefiles/ne_110m_admin_0_countries/ne_110m_admin_0_countries").then(function(geojson){
    React.render(<Map geojson={geojson}/>, document.body)
    return geojson;
});
var source1 = Rx.Observable.fromPromise(data);
geojson = source1.subscribe(
  // function (x) { console.log(x) };
  function(d) { console.log(d) }
);

// React.render(<Map geojson={geojson}/>, document.body)
