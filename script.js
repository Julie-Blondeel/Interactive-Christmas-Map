/* global Panzoom */

const mapImage = document.getElementById("mapImage");
const mapViewer = document.getElementById("mapViewer");

const panzoom = Panzoom(mapImage, {
    maxScale: 25,
    minScale: 1,
    step: 0.2
 });

mapViewer.addEventListener("wheel",
    panzoom.zoomWithWheel, {
        passive:false
    });

function resetToCenter() {
    panzoom.reset({animate:false});
}

window.addEventListener("load", () =>{
    resetToCenter();
});

window.addEventListener("resize", () => {
    resetToCenter();
});
