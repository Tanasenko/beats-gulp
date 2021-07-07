(function () {
    const hamburger = document.querySelector('.hamburger');
    const miniMenu = document.querySelector('.mini-menu');

hamburger.addEventListener('click', e =>{
    if ( miniMenu.style.display == 'none') {
        miniMenu.style.setProperty('display', 'initial');
    } else miniMenu.style.display = 'none';
});
})
