const slider = () => {
  const getPriceMax = () => {
    const items = $('.js-gridItem');
    let value = 0;
    let cur = 0;

    for(let i = 0; i < items.length; i++) {
      cur = items[i].getAttribute('data-filter-pricemax');
      if(value < cur ) {
        value = cur;
      }
    }
    return parseInt(value);
  }

  const getPriceMin = () => {
    const items = $('.js-gridItem');
    let value = 1000
    let cur = 0;

    for(let i = 0; i < items.length; i++) {
      cur = items[i].getAttribute('data-filter-pricemin');
      if(value > cur ) {
        value = cur;
      }
    }
    return parseInt(value);
  }

  let min = getPriceMin();
  let max = getPriceMax();

  setTimeout(() => {
    $(".js-sliderPriceRange" ).slider({
      range: true,
      min: min,
      max: max,
      values: [min, max],
      slide: function( event, ui ) {
        $(".js-amount").val(ui.values[0] + "€ - " + ui.values[1]  + "€");
      }
    });

    $(".js-amount").val($( ".js-sliderPriceRange").slider("values", 0) +
    "€ - " + $(".js-sliderPriceRange").slider("values", 1 ) + "€");
  }, 100)
}

export default slider;