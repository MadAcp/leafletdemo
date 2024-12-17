var cords, center, zoomLevel;

cords = cords_sangli;
center = center_sangli;
zoomLevel = zoom_sangli

// Map configurations 
const key = 'NrkwVsgcuyrvP4WtMKGT';
const layerAttrb = "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e";

const map = L.map('map').setView(center, zoomLevel);
L.control.maptilerGeocoding({ apiKey: key }).addTo(map);

const layer = L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{
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
    'geometry': {
        'type': 'Polygon',
        'coordinates': [cords]
    }
}, {
    style: {
        color: "blue",
        fillOpacity: 0
    }
});

layerGroup.addLayer(defaultGeoJsonDataLayer);

var geoJsonDataLayer = L.geoJSON({
        'type': 'Feature',
    });
layerGroup.addLayer(geoJsonDataLayer);

renderMap();

function renderMap(selectedRegion){

    let borderColor = "blue";

    if(selectedRegion !== "" && selectedRegion !== undefined){
        cords = eval("cords_"+selectedRegion);
        center = eval("center_"+selectedRegion);
        zoomLevel = eval("zoom_"+selectedRegion);
        if(selectedRegion !== "sangli")
            borderColor = "black";
    }

    layerGroup.removeLayer(geoJsonDataLayer);

    geoJsonDataLayer = L.geoJSON({
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [cords]
        }
    }, {
        style: {
            color: borderColor,
            fillOpacity: 0
        }
    });

    layerGroup.addLayer(geoJsonDataLayer);

    let mapCenter = L.latLng({lat: center[0], lng: center[1]});
    map.setView(mapCenter, zoomLevel);
}

// other events
function openNav() {
    document.getElementById("mySidenav").style.width = "120px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/*
opacity: 0.8,
    fillColor: "#088",
    fillOpacity: 0.8
    */