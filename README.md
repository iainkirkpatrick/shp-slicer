*shp-slicer*

a web-app for clipping your shapefiles if you don't have (or don't want to boot up) your shiny GIS systems

instructions:
- drag-and-drop your shp as a .zip file onto the map, wait for the data to display
- draw the clipping boundaries with the draw toolbar
- once you confirm the boundaries, the clipped area will download to your default downloads location
- voila!

i made this quickly and dirtily in a weekend, still improvements to be made (with UX esp):
- some kind of instructions, maybe a modal
- draw tools don't error if no shapefile uploaded
- naming of the clip download with same names of upload
- general UX flow-type bugs like uploading a second shp, confirming clip on drawing etc
- most of the core logic is in the componentDidMount function, ideally break it out (because ideally the map component could be reused for other projects)
