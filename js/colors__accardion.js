$(document).ready(() => {
    (function () {
        const mesureWidth = item => {
        let reqItemWidth = 0;

        const screenWidth = $(window).width();
        const container = item.closest('.colors__list');
        const titleBlocks = container.find('.color__title');
        const titleWidth = titleBlocks.width() * titleBlocks.length;

        const textContainer = item.find('.color__text');
        const paddingLeft = parseInt(textContainer.css('padding-left'));
        const paddingRight = parseInt(textContainer.css('padding-right'));

        console.log(paddingLeft);
        console.log(paddingRight);

        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (isMobile){
            reqItemWidth = screenWidth - titleWidth;
        } else {
            reqItemWidth =  500;
        }

        return {
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingLeft - paddingRight
            
        }        
    };

    const closeEveryItemInContainer = (container) => {
        const items = container.find('.color__item');
        const content = container.find('.color__content');

        items.removeClass('active');
        content.width(0);

    };

    const openItem = (item) => {
        const hiddenContent = item.find('.color__content')
        const reqWidth =  mesureWidth(item);
        const textBlock = item.find('.color__text');

        item.addClass('active');
        hiddenContent.width(reqWidth.container);
        textBlock.width(reqWidth.textContainer);
    };

    $('.color__title').on('click', e =>{
        const $this = $(e.currentTarget);
        const item = $this.closest('.color__item');
        const itemOpened = item.hasClass('active');
        const container = $this.closest('.colors__list');

        if (itemOpened) {
            closeEveryItemInContainer(container)
        } else {
            closeEveryItemInContainer(container)
            openItem(item);
        }

    });

    })

    

});