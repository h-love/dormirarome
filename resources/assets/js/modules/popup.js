const popup = () => {
  const $popupBooking = $('.js-popupBooking')
  const $popupSlider = $('.js-popupSlider')
  const $body = $('body')

  $('.js-popupContent').click((e) => {
    e.stopPropagation();
  })

  $('.js-popupBookingOpen').click(() => {
    $popupBooking.addClass('active')
    $body.addClass('u-noScroll')
  })

  $('.js-popupBookingClose').click(() => {
    $popupBooking.removeClass('active')
    $body.removeClass('u-noScroll')
  })

  $('.js-popupSliderOpen').click(() => {
    $popupSlider.addClass('active')
    $body.addClass('u-noScroll')
  })

  $('.js-popupSliderClose').click(() => {
    $popupSlider.removeClass('active')
    $body.removeClass('u-noScroll')
  })
}

export default popup;