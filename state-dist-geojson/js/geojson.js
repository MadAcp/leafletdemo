
var cords = cords_mh;
var center = center_mh;
var zoomLevel = zoom_mh
/*
var cordsSangli = cords_sangli;
var cordsKolhapur = cords_kolhapur;
var cordsSolapur = cords_solapur;
*/

// Map init Code 
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

var geoJsonDataLayer = L.geoJSON({
        'type': 'Feature',
        'geometry': {
            'type': 'MultiPolygon',
            'coordinates': cords
        }
    }, {
        style: {
            color: "blue",
            fillOpacity: 0
        }
    });

layerGroup.addLayer(geoJsonDataLayer);

// other events
function openNav() {
    document.getElementById("mySidenav").style.width = "120px";
    document.getElementById("close-menu-btn").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("close-menu-btn").style.display = "none";
}

function showDistrictMap(districtName) {

    let newCords = eval("cords_"+districtName);
    let newCenter = eval("center_"+districtName);
    let zoomLevel = eval("zoom_"+districtName)

    console.log(newCords);

    layerGroup.removeLayer(geoJsonDataLayer);

    if(districtName === 'mh'){
        geoJsonDataLayer = L.geoJSON({
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': newCords
            }
        }, {
            style: {
                color: "blue",
                fillOpacity: 0
            }
        });
    } else if(districtName === "palghar" || districtName === "mumbai" 
        || districtName === "raigad" || districtName === "ratnagiri" 
        || districtName === "sindhudurg" || districtName === "thane" 
        || districtName === "aurangabad" || districtName === "gadchiroli"
        || districtName === "washim") {
        geoJsonDataLayer = L.geoJSON({
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': newCords
            }
        }, {
            style: {
                color: "black",
                fillOpacity: 0
            }
        });
    } else {
        geoJsonDataLayer = L.geoJSON({
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [newCords]
            }
        }, {
            style: {
                color: "black",
                fillOpacity: 0
            }
        });
    }
    

    layerGroup.addLayer(geoJsonDataLayer);

    let mapCenter = L.latLng({lat: newCenter[0], lng: newCenter[1]});
    map.setView(mapCenter, zoomLevel);

}
