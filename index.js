var React = require('react');
var Map = require('./map')
var Vex = require('vex-js/js/vex.js');
var VexDialog = require('vex-js/js/vex.dialog.js');

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

//vex stuff
Vex.defaultOptions.className = 'vex-theme-wireframe';
Vex.open({
  content: '<div><h2>shp-slicer</h2></div>' +
           '<div><p>1. drag and drop a ZIPPED shapefile onto the map window (NOTE: loading the shp may take a while - be patient!).</p></div>' +
           '<div><p>2. once the shp has loaded, use the polygon / rectangle tool in the top right to draw the area you wish to clip out of the shapefile.</p></div>' +
           '<div><p>3. confirm the boundaries, and the shapefile will download to your default local downloads location.</p></div>' +
           '<div><p>4. any comments / feedback, log an issue at https://github.com/iainkirkpatrick/shp-slicer/issues/ or hit me at kirkpatrick.iain@gmail.com.</p></div>' +
           '<div><p>ps. much love to <a href="http://facebook.github.io/react/">React</a> and <a href="http://mapbox.com">Mapbox</a> for the main tools used.</p></div>',
  afterOpen: function($vexContent) {
  },
  afterClose: function() {
    //ideally don't allow drag-and-drop of shp's until here
  }
});
