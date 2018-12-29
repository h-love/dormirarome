const map = () => {
  const Colosseum = L.icon({
    iconUrl: '/_pro/dormirarome/wp-content/themes/dormirarome/static/images/colosseum.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
  });

  const Vatican = L.icon({
    iconUrl: '/_pro/dormirarome/wp-content/themes/dormirarome/static/images/basilica.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
  });

  const map = L.map('map').setView([$('.js-coords').data('lat'), $('.js-coords').data('lng')], 13);
  map.scrollWheelZoom.disable();

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    accessToken: 'pk.eyJ1IjoiaGxvdmUiLCJhIjoiY2pvcXo0Y2o3MDlncDNwcGM1bmpmcHZpbiJ9.oiRhcclvb_joiRK98r9CVA'
  }).addTo(map);

  L.marker([41.890394, 12.492024], {icon: Colosseum}).addTo(map);
  L.marker([41.902168, 12.453937], {icon: Vatican}).addTo(map);
  L.marker([$('.js-coords').data('lat'), $('.js-coords').data('lng')]).addTo(map);
}

export default map;