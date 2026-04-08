/* global Panzoom */

const mapImage = document.getElementById("mapImage");
const mapViewer = document.getElementById("mapViewer");

/*const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const resetZoomBtn = 
document.getElementById("resetZoom");
const zoomLevel = document.getElementById("zoomLevel");*/

const panzoom = Panzoom(mapImage, {
    maxScale: 25,
    minScale: 1,
    step: 0.2
    /*contain: "inside",
    startScale: 1,
    cursor:"grab"*/
});

/*
function updateZoomLabel() {
    const scale = panzoom.getScale();
    zoomLevel.textContent = `${Math.round(scale * 100)}%`;
}

function resetMapPosition() {
    panzoom.reset({
      animate: true
    });
    updateZoomLabel();
}

zoomInBtn.addEventListener("click", ()=>{
    panzoom.zoomIn();
    updateZoomLabel();
});

zoomOutBtn.addEventListener("click", ()=>{
    panzoom.zoomOut();
    updateZoomLabel();
});

resetZoomBtn.addEventListener("click", ()=>{
    resetMapPosition();
});*/

mapViewer.addEventListener("wheel",
    panzoom.zoomWithWheel, {
        passive:false
    });

function resetToCenter() {
    panzoom.reset({animate:false});
}

/*
mapImage.addEventListener("panzoomchange",
    updateZoomLabel);*/

window.addEventListener("load", () =>{
    resetToCenter();
});

window.addEventListener("resize", () => {
    resetToCenter();
});

/*updateZoomLabel();*/


/*mapViewer.addEventListener(
    'touchstart',
    function(e){
        e.preventDefault();
    },
    {passive:false}
);*/