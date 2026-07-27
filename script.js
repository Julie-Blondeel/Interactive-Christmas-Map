/* global Panzoom */

/*Find the main elements*/

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

/*Find the popup elements*/

const popup = document.getElementById("popup");
const popupTitle =
document.getElementById("popupTitle");
const popupText = 
document.getElementById("popupText");
const popupClose = 
document.getElementById("popupClose");

if(!popup || !popupTitle || !popupText || !popupClose){
    throw new Error("One or more popup elements were not found");
}

/*PANZOOM*/

const panzoom = Panzoom(mapLayer, {
    maxScale: 25,
    minScale: 1,
    step: 0.2
});

/*Zoom with the mouse wheel*/

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


/*Markers and popup*/

const markers = document.querySelectorAll(".marker");

let activeMarker = null;
let popupAnimationFrame = null;

/*Position the popup next to its marker*/

function positionPopup(marker){
    if(!marker || popup.classList.contains("hidden")){
        return;
    }

    const markerRect = marker.getBoundingClientRect();
    const viewerRect = mapViewer.getBoundingClientRect();

    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;

    const gap = 12;

    const markerLeft = 
    markerRect.left - viewerRect.left;

    const markerRight = 
    markerRect.right - viewerRect.left;

    const markerCenterY = 
    markerRect.top - 
    viewerRect.top +
    markerRect.height /2;

    let left = markerRight + gap;
    let top = markerCenterY - popupHeight/2;

    /*Place popup on the left if needed*/

    if (left + popupWidth > viewerRect.width - gap){
        left = markerLeft - popupWidth - gap;
    }

    /*Keep popup inside viewer horizontally*/

    const maximumLeft = Math.max(
        gap,
        viewerRect.width - popupWidth - gap);

        left = Math.max(
            gap,
            Math.min(left, maximumLeft)    
    );

    /*Keep popup inside viewer vertically*/

    const maximumTop = Math.max(
        gap,
        viewerRect.height - popupHeight - gap
    );

    top = Math.max(
        gap,
        Math.min(top, maximumTop)
    );

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
}

/*Update popup position*/

function schedulePopupPosition() {
    if(!activeMarker || popup.classList.contains("hidden")){
        return;
    }

    if(popupAnimationFrame !== null){
        cancelAnimationFrame(popupAnimationFrame);
    }

    popupAnimationFrame = requestAnimationFrame(() =>
    {
        positionPopup(activeMarker);
        popupAnimationFrame  = null;
    });
}

/*Open popup*/

markers.forEach((marker) =>{
    marker.addEventListener("click",(event) => {
        event.stopPropagation();

        const title = marker.dataset.title ||"";
        const text = marker.dataset.text ||"";

        popupTitle.textContent = title;
        popupText.textContent = text;

        activeMarker = marker;

        popup.classList.remove("hidden");

        schedulePopupPosition();
    });
});

/*Follow the marker during zoom and movement*/

mapLayer.addEventListener(
    "panzoomchange",
    schedulePopupPosition
);

mapLayer.addEventListener(
    "panzoompan",
    schedulePopupPosition
);

mapLayer.addEventListener(
    "panzoomzoom",
    schedulePopupPosition
);

/*Reset after resizing or rotating the screen*/

let resizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        resetToCenter();
        schedulePopupPosition();
    }, 150);
});

/*Close the Popup*/

function closePopup(){
    popup.classList.add("hidden");
    activeMarker = null;

    if(popupAnimationFrame !==null){
        cancelAnimationFrame = null;
    }
}

/*Close with the close button*/

popupClose.addEventListener("click", (event) => {
    event.stopPropagation();
    closePopup();
});

/*Close when clicking outside*/

mapViewer.addEventListener("click", (event) => {
    const clickMarker = event.target.closest(".marker");
    const clickedPopup = event.target.closest(".popup");

if(!clickedMarker && !clickedPopup) {
    closePopup ();
}
});








