var React = require('react');
require('mapbox.js'); // <-- auto-attaches to window.L

//mapbox config stuff
L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';


var Map = React.createClass({
  componentDidMount: function() {
    L.mapbox.map('map', 'envintage.i9eofp14');
  },
  render: function() {
    var mapStyle = {
      position:'absolute',
      top:'0',
      bottom:'0',
      width:'100%'
    };
    return (
      <div style={mapStyle} id="map"/>
    );
  }

});

module.exports = Map;
