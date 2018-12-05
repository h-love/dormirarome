const carousel = () => {
  $('.js-slider-logement').owlCarousel({
    autoplay: false,
    autoplayHoverPause:true,
    items: 1,
    loop: true,
    nav : true, 
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true,
    autoHeight:true
  })

  $('.js-slider-logementCard').owlCarousel({
    items: 1,
    loop: true,
    nav : true,
    dots: true
  })

  $('.js-slider-logementCard > .owl-nav > .owl-prev').on('click', (e) => {
    e.preventDefault();
  });

  $('.js-slider-logementCard > .owl-nav > .owl-next').on('click', (e) => {
    e.preventDefault();
  });
}

export default carousel;