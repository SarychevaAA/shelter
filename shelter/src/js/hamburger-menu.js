const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.header__menu');
const links = document.querySelectorAll('.menu__element')
const body = document.querySelector('body');
const menuLinks = document.querySelectorAll('.menu__element[data-link]')
const moveMenu = ()=>{
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('scroll-hidden');
}
const linkClick = ()=>{
    hamburger.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('scroll-hidden');
}
if (hamburger && menu){
    hamburger.addEventListener('click', moveMenu)
    links.forEach((link)=>{
        link.addEventListener('click', linkClick)
    })
    menu.addEventListener('click', (event)=>{
        if ([...event.target.classList].indexOf('header__menu') !== -1){
            moveMenu();
        }
    })

}
if (menuLinks.length > 0){
    menuLinks.forEach(menuLink =>{
        menuLink.addEventListener('click', (event)=>{
            const link = event.target;
            if (menuLink.dataset.link.indexOf('.html') !== -1){
                event.preventDefault();
                setTimeout(function(){
                    window.location.href = menuLink.dataset.link;
                }, 0.8 * 1000);
            }
        })
    })
}