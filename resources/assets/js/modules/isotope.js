const isotope = () => {
  const Isotope = require('isotope-layout');

  //ISOTOPE FILTERS
  const filters = {};
  const filterFunctions = {
    filterPrice: function() {
      const userPriceMin = $('.js-sliderPriceRange').slider('values', 0);
      const userPriceMax = $('.js-sliderPriceRange').slider('values', 1);;
      const apartmentPriceMin = $(this).attr('data-filter-pricemin');
      const apartmentPriceMax = $(this).attr('data-filter-pricemax');

      if (userPriceMin <= apartmentPriceMax && userPriceMax >= apartmentPriceMin) {
        return true;
      }
      return false;
    },
    filterPeople: function() {
      const value = $('#filterPeople').val();
      const min = $(this).attr('data-filter-peoplemin');
      const max = $(this).attr('data-filter-peoplemax');

      if (value >= min && value <= max || !value) {
        return true;
      }
      return false;
    },
  }
  const iso = new Isotope( '.js-isotopeOuSeLoger', {
    itemSelector: '.js-gridItem',
    layoutMode: 'fitRows',
    transitionDuration: 0,
    percentPosition: true,
    fitRows: {
      gutter: '.js-gutterSizer'
    },
    filter: function(itemElem) {
      let isMatched = true;
      const $this = $(itemElem);

      for(const prop in filters) {
        let filter = filters[prop];
        filter = filterFunctions[filter] || concatValues(filters);

        if (filter) {
          isMatched = isMatched && $this.is(filter);
        }
      }

      if(isMatched) {
        itemElem.classList.add('js-matched')
      } else {
        itemElem.classList.remove('js-matched')
      }

      return isMatched;
    }
  });

  let itemsVisibleNumber = 9
  const setVisibleItems = () => {
    let items = $('.js-matched')
    items.animate({opacity: 0}, 500)

    setTimeout(() => {
      iso.arrange();
      items = $('.js-matched')
      for(let i = 0; i < items.length; i++) {
        if(i < itemsVisibleNumber) {
          items[i].classList.remove('hide')
        } else {
          items[i].classList.add('hide')
        }
      }
      iso.arrange();
      items.animate({opacity: 1}, 1000);
      updateFilterCount();
    }, 500)
  }
  setVisibleItems();

  const addVisibleItems = () => {
    let items = $('.js-matched')
    for(let i = 0; i < items.length; i++) {
      if(i < itemsVisibleNumber) {
        items[i].classList.remove('hide')
      } else {
        items[i].classList.add('hide')
      }
    }
    iso.arrange();
  }

  $('.js-filterButtonGroup').on( 'click', 'option', function() {
    filterPost($(this));
  });

  $('.js-filterButtonGroup').on( 'slidechange', '.ui-slider', function() {
    filterPost($(this));
  });

  $('.js-filterButtonGroup').on( 'click', 'button', function() {
    filterPost($(this));
  });

  $('.js-filterButtonGroup').on( 'change', function( jQEvent ) {
    const $this = $($(this)[0])
    const filterGroup = $this.attr('data-filter-group');
    const event = $(jQEvent.target);
    filters[filterGroup] = manageCheckbox($(this), filterGroup, event);
  });

  const manageCheckbox = (el, filterGroup, event) => {
    let str = ''
    const children = el.children()
    let count = 0

    for (let i = 0; i < children.length; i++) {
      if(children[i].checked && children[i].getAttribute(filterGroup)) {
        count++
        str += str ? "," : "";
        str += ".js-gridItem["+filterGroup+"='"+children[i].getAttribute(filterGroup)+"']";
      }
    }

    if(event.hasClass('js-all')) {
      $(event[0]).siblings('input').prop('checked', false);
      el.children('input.js-all').prop('checked', true);
      str = ''
    } else if (!count) {
      el.children('input.js-all').prop('checked', true);
      str = ''
    } else {
      $(event[0]).siblings('input.js-all').prop('checked', false);
    }

    return str
  }

  const filterPost = (el) => {
    const $this = $(el);

    const $buttonGroup = $this.parents('.js-filterButtonGroup');
    const filterGroup = $buttonGroup.attr('data-filter-group');

    filters[filterGroup] = $this.attr(filterGroup);
  }

  $('.js-applyFilters').on( 'click', function() {
    applyFillters();
  });

  const applyFillters = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    itemsVisibleNumber = 9
    setVisibleItems();
    updateFilterCount();
  }

  const $filterCount = $('.js-filterCount');
  const updateFilterCount = () => {
    let str = ''
    if (iso.filteredItems.length > 1) {
      str = iso.filteredItems.length + ' logements'
    } else {
      str = iso.filteredItems.length + ' logement'
    }

    $filterCount.text(str);
  }
  updateFilterCount();

  const concatValues = (obj) => {
    let value = '';
    let array = []
    let finalArray = []
    let i = 0
    for(const prop in obj) {
      if(!filterFunctions[obj[prop]]) {
        if(
          prop === 'data-filter-quartier' || 
          prop === 'data-filter-type' ||
          prop === 'data-filter-smoke' ||
          prop === 'data-filter-pets'
        ) {
          array[i] = obj[prop].split(",")
        } else {
          value += obj[prop] ? ".js-gridItem["+prop+"='"+obj[prop]+"']" : '';
        }
      }
      i++
    }

    array.sort((a, b) => b.length - a.length);

    if(array[3]) {
      for(let j = 0; j < array[0].length; j++) {
        for(let jj = 0; jj < array[1].length; jj++) {
          for(let jjj = 0; jjj < array[2].length; jjj++) {
            for(let jjjj = 0; jjjj < array[3].length; jjjj++) {
              finalArray.push(array[0][j] +array[1][jj] + array[2][jjj] + array[3][jjjj])
            }
          }
        }
      }
    } else if(array[2]) {
      for(let j = 0; j < array[0].length; j++) {
        for(let jj = 0; jj < array[1].length; jj++) {
          for(let jjj = 0; jjj < array[2].length; jjj++) {
            finalArray.push(array[0][j] + array[1][jj] + array[2][jjj])
          }
        }
      }
    } else if(array[1]) {
      for(let j = 0; j < array[0].length; j++) {
        for(let jj = 0; jj < array[1].length; jj++) {
          finalArray.push(array[0][j] + array[1][jj])
        }
      }
    } else {
      for(let j = 0; j < array[0].length; j++) {
        finalArray.push(array[0][j])
      }
    }

    value += finalArray.join();

    return value;
  }

  window.addEventListener('scroll', () => {
    if($(document).height() - $(window).height() - 100  <= pageYOffset) {
      itemsVisibleNumber += 3
      addVisibleItems();
    }
  });
}

export default isotope;