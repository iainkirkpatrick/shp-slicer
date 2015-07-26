var React = require('react');
var VexDialog = require('vex-js/js/vex.dialog.js');
var Shp = require('shpjs');
var Turf = require('turf');
var Shpwrite = require('shp-write');
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

    //shp upload logic
    var dropZone = document.getElementById('map');
    dropZone.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }, false);
    dropZone.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();

      map.featureLayer.clearLayers();

      var files = e.dataTransfer.files;
      console.log(files[0].name);

      var reader = new FileReader();
      reader.onloadend = function(ev) {
        if (ev.target.readyState == FileReader.DONE) {
          var shapefile = ev.target.result;
          Shp(shapefile).then(function(data){
            geojson = data;
            map.featureLayer.setGeoJSON(geojson);
          });
        }
      };
      // reader.onload = (function(file) {
      //   return function(ev) {
      //     var shapefile = ev.target.result;
      //     Shp(shapefile).then(function(data){
      //       map.featureLayer.setGeoJSON(data);
      //       geojson = data;
      //     });
      //   }
      // })(files[0]);
      reader.readAsArrayBuffer(files[0]);

    }, false);

    //draw controls / logic
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false
        },
        polyline: false,
        circle: false,
        marker: false
      }
    });
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
			var type = e.layerType,
				  layer = e.layer;

      if (geojson) {
        //turf intersection logic, break out to own module?
        //find the country that is being intersected (what about multiple?)
        var intersectingFeature = geojson.features.filter(function(feature) {
          return Turf.intersect(feature, layer.toGeoJSON());
        });

        if (intersectingFeature.length > 0) {
          //probably should go into drawnItems featureGroup, not replace uploaded geojson?
          //or at least have some way of signifying the difference, ready for re-download.
          var clip = Turf.intersect(intersectingFeature[0], layer.toGeoJSON());
          map.featureLayer.setGeoJSON(clip);

          VexDialog.confirm({
            message: 'Confirm the clip?',
            callback: function(value) {
              if (value) {
                Shpwrite.download({
                  type: 'FeatureCollection',
                    features: [
                      clip
                    ]
                });
              } else {
                map.featureLayer.setGeoJSON(geojson);
              }
            }
          });
        }
      };
		});
  },
  render: function() {
    return (
      <div style={this.style()} id="map"/>
    );
  }
});

module.exports = Map;
