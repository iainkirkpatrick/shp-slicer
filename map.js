var React = require('react');
var Shp = require('shpjs');
var Turf = require('turf');
require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet-draw');

//mapbox config stuff
L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';


var Map = React.createClass({
  style: function() {
    return {
      position:'absolute',
      top:'0',
      bottom:'0',
      width:'100%'
    }
  },
  getDefaultProps: function() {
    return {
      view: {
        latlon: [-41.28646, 174.77624],
        zoom: 13
      },
      geojson: null
    };
  },
  componentDidMount: function() {
    var map = L.mapbox.map('map', 'envintage.i9eofp14')
      .setView(this.props.view.latlon, this.props.view.zoom);

    var geojson;
    Shp("shapefiles/ne_110m_admin_0_countries/ne_110m_admin_0_countries").then(function(data){
        map.featureLayer.setGeoJSON(data);
        geojson = data;
    });

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        circle: false,
        marker: false
      }
    });
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
			var type = e.layerType,
				  layer = e.layer;
			// drawnItems.addLayer(layer);

      //turf intersection logic, break out to own module?
      //find the country that is being intersected (what about multiple?)
      var intersectingFeature = geojson.features.filter(function(feature) {
        return Turf.intersect(feature, layer.toGeoJSON());
      });

      //probably should go into drawnItems featureGroup, not replace uploaded geojson?
      //or at least have some way of signifying the difference, ready for re-download.
      map.featureLayer.setGeoJSON(Turf.intersect(intersectingFeature[0], layer.toGeoJSON()));

		});

    // if (this.props.geojson) {
    //   map.featureLayer.setGeoJSON(this.props.geojson);
    // };
  },
  render: function() {
    return (
      <div style={this.style()} id="map"/>
    );
  }
});

module.exports = Map;
