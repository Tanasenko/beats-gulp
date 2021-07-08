    (function () {
        const findBlockByAlias = alias => {
            return $('.reviews__display').filter((ndx, item) =>{
                return $(item).attr('data-linked-with') == alias;
            });;
        };

        $('.interectiv-avatar__link').on('click', e =>{
            e.preventDefault();

            const $this = $(e.currentTarget);
            const target = $this.attr('data-open');
            const itemToShow = findBlockByAlias(target);
            const curItem = $this.closest('.interectiv-avatar');

            itemToShow.addClass('reviews__display--active').siblings().removeClass('reviews__display--active');
            curItem.addClass('interectiv-avatar--activ').siblings().removeClass('interectiv-avatar--activ');
        
    }) 
    })
    