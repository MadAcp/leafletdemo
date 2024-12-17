"use strict";
var cords, center, zoomLevel;

cords = cords_sangli;
center = center_sangli;
zoomLevel = zoom_sangli

// Map configurations 
const key = 'NrkwVsgcuyrvP4WtMKGT';
const layerAttrb = "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e";

const map = L.map('map').setView(center, zoomLevel);
L.control.maptilerGeocoding({ apiKey: key }).addTo(map);

let mapStreetBaseTile = `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`;
let mapHybridTile = `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.png?key=${key}`;
let mapHotTile = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

const layer = L.tileLayer(mapStreetBaseTile,{
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: layerAttrb,
    crossOrigin: true
}).addTo(map);

var layerGroup = new L.LayerGroup();
layerGroup.addTo(map);

var defaultGeoJsonDataLayer = L.geoJSON({
    'type': 'Feature',
    "properties": {
        "name": "default"
    },
    'geometry': {
        'type': 'Polygon',
        'coordinates': [cords]
    }
}, {
    style: {
        color: "blue",
        fillOpacity: 0,
        //dashArray: "10",
        //weight: 2
        //dashArray: '5, 10',
        //lineCap: 'square',
    }
});

layerGroup.addLayer(defaultGeoJsonDataLayer);

var geoJsonDataLayer = L.geoJSON({
        'type': 'Feature',
    });
layerGroup.addLayer(geoJsonDataLayer);

renderCountyMaps();

function renderCountyMaps(){
    let countyArray = ["atpadi", "jat", "kadegaon", "kavathemahankal", "khanapur", "miraj", "palus", "shirala", "tasgaon", "walwa"];
    countyArray.forEach(function(item){ 

        cords = eval("cords_"+item);

        let geoJsonDataLayer =  L.geoJSON({
            'type': 'Feature',
            "properties": {
                "name": "county_"+item,
            },
            'geometry': {
                'type': 'Polygon',
                'coordinates': [cords]
            }
        }, {
            style: {
                color: "black",
                fillOpacity: 0,
                //dashArray: "10",
                //weight: 1
            } 
        }).on('click', function (e) {
            regionClickHandler(item)
        });

        geoJsonDataLayer.id = item;

        layerGroup.addLayer(geoJsonDataLayer);

    });
}

function regionClickHandler(selectedRegion){
    closeInfoBox();
    highlightRegion(selectedRegion);
    if(selectedRegion !== 'sangli'){
        openInfoBox(selectedRegion);
    }
}

function highlightRegion(selectedRegion) {
    layerGroup.eachLayer((layer)=>{
        if(layer.id === selectedRegion){
            layer.setStyle({fillColor :'#DCDCDC',fillOpacity: 0.8});
        } else {
            layer.setStyle({fillOpacity: 0});
        }
    });
}

// other events
function openNav() {
    document.getElementById("mySidenav").style.width = "120px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function openInfoBox(item) {
    document.getElementById("info-box").style.width = "300px";
    let info = eval("info_"+item);
    document.getElementById("info").innerHTML = "<p style='padding:20px'>"+info+"</p>"
}

function closeInfoBox() {
    document.getElementById("info-box").style.width = "0";
    layerGroup.eachLayer((layer)=>{
        layer.setStyle({fillOpacity: 0});
    });
}
