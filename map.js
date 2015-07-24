var React = require('react');
var Shp = require('shpjs');
require('mapbox.js'); // <-- auto-attaches to window.L

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

    var data = Shp("shapefiles/ne_110m_admin_0_countries/ne_110m_admin_0_countries").then(function(geojson){
        map.featureLayer.setGeoJSON(geojson);
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
