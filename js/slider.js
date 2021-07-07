(function () {
    const slider = $('.assortment__list').bxSlider({
    pager: false,
    controls: false,
});

$('.assortment__control--left').click((e) => {
    slider.goToPrevSlide();
});

$('.assortment__control--right').click((e) => {
    slider.goToNextSlide();
});
})



