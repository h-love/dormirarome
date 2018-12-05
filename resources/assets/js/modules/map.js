const map = () => {
  const LeafIcon = L.Icon.extend({
    options: {
      shadowUrl: '../../images/home.png',
      iconSize:     [38, 95],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
    }
  });

  const homeIcon = new LeafIcon({iconUrl: '/static/images/home.png'});

  const map = L.map('map').setView([$('.js-coords').data('lat'), $('.js-coords').data('lng')], 13);
  map.scrollWheelZoom.disable();

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaGxvdmUiLCJhIjoiY2pvcXo0eWhqMDh5OTNwcGhnemQ4MTIwaSJ9.EWLRfsWpIZvRQMUBT2-_Yg'
  }).addTo(map);

  L.marker([$('.js-coords').data('lat'), $('.js-coords').data('lng')], {icon: homeIcon}).addTo(map);
}

export default map;