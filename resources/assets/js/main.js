import $ from 'jquery'
import 'webpack-jquery-ui'
import 'webpack-jquery-ui/css'
import 'leaflet'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import 'owl.carousel'
import carousel from './modules/carousel'
import isotope from './modules/isotope'
import map from './modules/map'
import slider from './modules/slider'

$(document).ready(() => {
  carousel();

  if($('.js-isotopeOuSeLoger').length >= 1) {
    isotope();
  }

  if($("#map").length >= 1) {
    map();
  }

  slider();
});
