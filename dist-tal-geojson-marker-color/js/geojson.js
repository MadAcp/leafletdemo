var center = center_sangli;
var zoom = zoom_sangli;
var cords = cords_sangli;

const key = 'CbPQBbbGX0sLR9q0qAiO';
const map = L.map('map').setView(center, zoom);
const layer = L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{
  tileSize: 512,
  zoomOffset: -1,
  minZoom: 1,
  attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
  crossOrigin: true
}).addTo(map);
L.geoJSON({
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
}).addTo(map);

L.control.maptilerGeocoding({ apiKey: key }).addTo(map);


L.marker([16.850992407047286, 74.5810091594579], {icon: violetIcon}).addTo(map).bindPopup('<b>Sangli</b>').openPopup();;


markers.forEach(function(item){
  console.log(item.popUpText);
  L.marker(item.marker,{icon: greenIcon}).addTo(map).bindPopup('<b>'+item.popUpText+'</b>');
});

