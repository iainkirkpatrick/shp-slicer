console.log('hello');

var React = require('react');
var Map = require('./map')

//testing shp2geojson outside of map component

// var geojson;
// var data = Shp("shapefiles/ne_110m_admin_0_countries/ne_110m_admin_0_countries").then(function(geojson){
//     // React.render(<Map geojson={geojson}/>, document.body)
//     return geojson;
// });
// var source1 = Rx.Observable.fromPromise(data);
// source1.subscribe(function(d) {
//   geojson = d;
//   console.log(geojson);
// });
// React.render(<Map geojson={geojson}/>, document.body)

React.render(<Map />, document.body)
