/* global Panzoom */

const mapViewer = document.getElementById("mapViewer");
const mapLayer = document.getElementById("mapLayer");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupClose = document.getElementById("popupClose");

const panzoom = Panzoom(mapLayer,{
    maxScale: 25,
    minScale: 1,
    step: 0.2
 });

mapViewer.addEventListener(
    "wheel",
    (event) => {
        event.preventDefault();
        panzoom.zoomWithWheel(event);
    },
    { passive: false }
);
    

function resetToCenter(){
    panzoom.reset({animate:false});
}

window.addEventListener("load",() =>{
    resetToCenter();
});

window.addEventListener("resize",() => {
    resetToCenter();
});

const markers = document.querySelectorAll(".marker");

markers.forEach((marker) =>{
     marker.addEventListener("click",(event)=>{
        event.stopPropagation();

        const title = marker.dataset.title||"";
        const text = marker.dataset.text||"";

        popupTitle.textContent = title;
        popupText.textContent = text;
        popup.classList.remove("hidden");

    //position for popup close to the icon 

    const markerRect = marker.getBoundingClientRect();
    const viewerRect = mapViewer.getBoundingClientRect();

    let left = markerRect.left - viewerRect.left +30;
    let top = markerRect.top - viewerRect.top -10;

    //so that the popup does not extend beyond the right edge

    const popupWidth = 220;
    if(left + popupWidth > viewerRect.width - 12) {
        left = markerRect.left - viewerRect.left - popupWidth -20;
    }

    //so that the popup does not climb over the top

    if(top<12){
        top = markerRect.bottom - viewerRect.top +12;
    }
    
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;

     });
});

popupClose.addEventListener("click", (event)=>{
    event.stopPropagation();
    popup.classList.add("hidden");
});

mapViewer.addEventListener("click", (event)=> {
    if(!event.target.closest(".marker")&&!
event.target.closest(".popup")){
     popup.classList.add("hidden");
}
});
