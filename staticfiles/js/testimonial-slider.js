jQuery(document).ready(function (s) {
    s(".testimonial-slider").slick({
        initialSlide: 1,
        centerMode: true,
        centerPadding: '40px',
        dots: true,
        infinite: !0,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        responsive: [{
            breakpoint: 600,
            settings: {
                centerMode: false,
                centerPadding: '0px',
                arrows: false,
                dots: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 400,
            settings: {
                centerMode: false,
                centerPadding: '0px',
                autoplay: true,
                arrows: false,
                dots: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    })
});