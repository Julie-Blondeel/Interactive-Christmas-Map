/* global Panzoom */

const mapViewer = document.getElementById("mapViewer");
const mapLayer = document.getElementById("mapLayer");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupClose = document.getElementById("popupClose");

const panzoom = Panzoom(mapLayer, {
    maxScale: 25,
    minScale: 1,
    step: 0.2
    contain: "outside"
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

const markers = document.querySelectorAll(".marker");

markers.forEach((marker) => {
     marker.addEventListener("click",(event) => {
        event.stopPropagation();

        const title = marker.dataset.title||"";
        const text = marker.dataset.text||"";

        popupTitle.textContent = title;
        popup.Text.textContent = text;
        popup.classList.remove("hidden");
     });
});

popupClose.addEventListener("click", ()=>{
    popup.classList.add("hidden");
});

mapViewer.addEventListener("click", (event) => {
    if(!event.target.closest(".marker")&&!
event.target.closest(".popup")){
     popup.classList.add("hidden");
}
});
