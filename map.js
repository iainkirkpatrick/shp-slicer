var React = require('react');
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
      }
    };
  },
  componentDidMount: function() {
    L.mapbox.map('map', 'envintage.i9eofp14')
      .setView(this.props.view.latlon, this.props.view.zoom);
  },
  render: function() {
    return (
      <div style={this.style()} id="map"/>
    );
  }
});

module.exports = Map;
