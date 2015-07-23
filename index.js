console.log('hello');

require('mapbox.js'); // <-- auto-attaches to window.L
var React = require('react');
var Map = require('./map')

React.render(<Map />, document.body)
