(function () {
        const section = $('section');
    const display = $('.maincontent');
    const sideMenu = $('.fixed-menu');

    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();

    let inScroll = false;

    section.first().addClass('active');

    const countSectionPosition = sectionEq => {
        return sectionEq * -100;
    };

    //const resetActiveClassForItem

    const performTransition = sectionEq => {
        if (inScroll == false) {
            inScroll = true;

            const position = countSectionPosition(sectionEq);

            display.css({
            transform: `translateY(${position}%)`
            });

            section.eq(sectionEq).addClass('active').siblings().removeClass('active');

            sideMenu.find('.fixed-menu__item').eq(sectionEq).addClass('fixed-menu__item--active').siblings().removeClass('fixed-menu__item--active');

            setTimeout(() => {
                inScroll = false;  

                sideMenu.find('.fixed-menu__item').eq(sectionEq).addClass('fixed-menu__item--active').siblings().removeClass('fixed-menu__item--active');
            }, 100);
        }
        
    };

    const viewportScroller = () => {
        const activeSection = section.filter('.active');
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();

        return {
            next() {
                if (nextSection.length){
            performTransition(nextSection.index());
        }
            },
            prev(){
                if (prevSection.length){
            performTransition(prevSection.index());
        }
            }
        }

        

        
    }

    $(window).on('wheel', e => {
        const deltaY = e.originalEvent.deltaY;
        const scroller = viewportScroller();

        if (deltaY > 0){
            scroller.next();
        }

        if (deltaY < 0){
            scroller.prev();
        }
    });

    $(window).on('keydown', (e) => {
        const tagName = e.target.tagName.toLowerCase();
        
        if (tagName !== 'input' && tagName !== 'textarea') {
            switch (e.keyCode) {
            case 38:
                scroller.prev();
                break;

            case 40:
                scroller.next();
                break;
        }
        }
    });

    $('.wraper').on('touchmove', e => e.preventDefault());

    $('[data-scroll-to]').click(e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr('data-scroll-to');
        const reqSection = $(`[data-section-id=${target}]`);

        performTransition(reqSection.index());
    });

    if (isMobile){
        //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
        $("body").swipe({
            swipe:function(event, direction) {
                const scroller = viewportScroller();
                let scrollDirection = "";

                if (direction == 'up') scrollDirection = 'next';
                if (direction == 'down') scrollDirection = 'prev';

                scroller[scrollDirection]();
            
            }
        });
    }

})




