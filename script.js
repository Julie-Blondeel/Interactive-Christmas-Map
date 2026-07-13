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

 const initialScale = 1.25;


mapViewer.addEventListener(
    "wheel",
    (event) => {
        event.preventDefault();
        panzoom.zoomWithWheel(event);
     
    },
    { passive: false }
);
    

function resetToCenter(){   
    updateMarkerScale();
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

    

    let left = marker.offsetLeft +30;
    let top = marker.offsetTop -20;

    const popupWidth = 220;
    const popupHeight = 120;

    const layerWidth = mapLayer.offsetWidth;
    const layerHeight = mapLayer.offsetHeight;


    if(left + popupWidth > layerWidth - 12) {
        left = marker.offsetLeft - popupWidth -20;
    }


    if(top<12){
        top = marker.offsetTop +20;
    }

    if(top + popupHeight>layerHeight-12){
        top = layerHeight - popupHeight -12;
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
