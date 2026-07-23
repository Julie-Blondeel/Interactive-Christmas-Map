/* global Panzoom */

const mapViewer =
document.getElementById("mapViewer");
const mapLayer=
document.getElementById("mapLayer");

if(!mapViewer || !mapLayer) {
    throw new Error("mapViewer or mapLayer was not found");
}

if(typeof Panzoom === "undefined"){
    throw new Error("Panzoom library was not loaded");
}

const popup = document.getElementById("popup");
const popupTitle =
document.getElementById("popupTitle");
const popupText = 
document.getElementById("popupText");
const popupClose = 
document.getElementById("popupClose");

/*PANZOOM*/

const panzoom = Panzoom(mapLayer, {
    maxScale: 25,
    minScale: 1,
    step: 0.2
});

mapViewer.addEventListener(
    "wheel",
    (event) =>{
        event.preventDefault();
        panzoom.zoomWithWheel(event);
    },
    {passive:false}
);


/*RESET AND CENTER THE MAP*/

function resetToCenter(){
    panzoom.reset({
    animate:false
    });
}

window.addEventListener("load", resetToCenter);


/*Reset after screen resize or orientation change*/

let resizeTimer;

window.addEventListener("resize", () =>{
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() =>{
        resetToCenter();
    }, 150);
});


/*Markers and Popup*/

const markers = document.querySelectorAll(".marker");

markers.forEach((marker) => {
    marker.addEventListener("click", (event) =>{
        event.stopPropagation();

        const title = marker.dataset.title ||"";
        const text = marker.dataset.text ||"";

        popupTitle.textContent = title;
        popupText.textContent = text;
        popup.classList.remove("hidden");


/*Position popup close to the selected marker*/

let left = marker.offsetLeft + 15;
let top = marker.offsetTop -10;

const popupWidth = popup.offsetWidth;
const popupHeight = popup.offsetHeight;

const layerWidth = mapLayer.offsetWidth;
const layerHeight = mapLayer.offsetHeight;


/*Prevent popup from leaving the right side*/

if(left + popupWidth > layerWidth -12){
    left = marker.offsetLeft - popupWidth -10;
}

/*Prevent popup from leaving the top*/

if(top<12){
    top = marker.offsetTop + 20;
}

/*Prevent popup from leaving the bottom*/

if(top+popupHeight > layerHeight -12) {
    top = layerHeight - popupHeight -12;
}

popup.style.left = `${left}px`;
popup.style.top = `${top}px`;

});
});

/*Close popup with the close button*/

popupClose.addEventListener("click",(event)=>{
    event.stopPropagation();
    popup.classList.add("hidden");
});

/*Close popup when clicking outside it*/

mapViewer.addEventListener("click",(event) => {
    const clickedMarker = event.target.closest(".marker");
    const clickedPopup = event.target.closest(".popup");

    if(!clickedMarker&&!clickedPopup) {
        popup.classList.add("hidden");
    }
});























