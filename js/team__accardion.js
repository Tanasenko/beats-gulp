$(document).ready(() => {
    (function () {
        const openItem = item => {
        const container = item.closest('.team__item');
        const contentBlock = container.find('.accordion');
        const textBlock = contentBlock.find('.accordion__iner');
        const reqHeight = textBlock.height();

        container.addClass('active');
        contentBlock.height(reqHeight);
    }

    const closeEveryItem = container => {
        const items = container.find('.accordion');
        const itemContainer = container.find('.team__item');

        itemContainer.removeClass('active');
        items.height(0);
    }

    $('.team__title').on('click', e =>{
        const $this = $(e.currentTarget);
        const container = $this.closest('.team__list');
        const elemConteiner = $this.closest('.team__item');
        $this.toggleClass('team__title--active');

        if(elemConteiner.hasClass('active')){
        closeEveryItem(container);
        } else {
        closeEveryItem(container);
        openItem($this);
        
        }

        
    });

    })

    

});