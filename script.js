/*global Panzoom*/

const mapImage = document.getElementById('mapImage');
const mapViewer = document.getElementById('mapViewer');

const panzoom = Panzoom(mapImage, {
    maxScale: 4,
    minScale: 1,
    contain: 'outside'
});

mapViewer.addEventListener('wheel',
    panzoom.zoomWithWheel);


mapViewer.addEventListener(
    'touchstart',
    function(e){
        e.preventDefault();
    },
    {passive:false}
);