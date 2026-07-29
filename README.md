# Interactive Christmas Map Oudenaarde

Interactive Christmas map created for Toerisme Oudenaarde

## Live version

https://oudenaarde-kerst.netlify.app/

##Main files

-index.html - map structure, markers, positions and popup texts
-style.css - visual styling and object sizes
-script.js - zooming, panning, and popup behaviour
-images? - map, objects, and marker illustrations

## Editing text

Marker titles and texts can be edited in index.html:

data-title="..."
data-text="..."

## Editing positions

Marker positions are defined in index.html:

style="left: 62%; top: 29%;

Decorative object positions are defined in style.css with:

left:...%;
top:...%;

## Editing sizes

Decorative object sizes use:

--object-width:...%;

Marker sizes use:

--marker-width:...%;

## Replacing images

Keep the same file name and replace the corresponding SVG or PNG 
inside the images folder.

Alternatively, update the src path in index.html.

## Deployment

The project is connected to GitHub and deployed through Netlify.

Changes pushed to the main branch are published by Netlify.

## Integration

The map can be embedded into another website using an iframe,

or the HTML, CSS, JavaScript and images can be integrated directly
by the website developer.

## Author 

Created by Julie Sinclair for Toerisme Oudenaarde, 2026




