import petsInfo from '../pets.json';
const body = document.querySelector('body')
const modalWindow = document.querySelector('.modal')
const container = document.querySelector('.modal-window__img');
const modalImg = document.createElement('img');
let cardArr = document.querySelectorAll('.list-cards__element')
const closeButton = document.querySelector('.modal-window__close-element')
const leftButton = document.querySelector('#left-slider-btn')
const rightButton = document.querySelector('#right-slider-btn')

function generateModalWindow(card){
    modalWindow.style.opacity = "1";
    modalWindow.style.visibility = "visible";
    modalWindow.classList.add('modal_transition');
    const currentPet = petsInfo[card.id];
    modalImg.src = currentPet.img;
    modalImg.alt =  currentPet.name;
    container.append(modalImg);

    document.querySelector('#info-name').innerHTML = `${currentPet.name}`;
    document.querySelector('#info-breed').innerHTML = `${currentPet.type} - ${currentPet.breed}`;
    document.querySelector('#info-description').innerHTML = `${currentPet.description}`;
    document.querySelector('#info-age').innerHTML = `<span>Age:</span> ${currentPet.age}`;
    document.querySelector('#info-inoculations').innerHTML = `<span>Inoculations:</span> ${currentPet.inoculations}`;
    document.querySelector('#info-diseases').innerHTML = `<span>Diseases:</span> ${currentPet.parasites}`;
    document.querySelector('#info-parasites').innerHTML = `<span>Parasites:</span> ${currentPet.parasites}`;

    body.classList.add("scroll-hidden");
}

cardArr.forEach((card)=>{
    card.addEventListener('click', ()=>{
       generateModalWindow(card);
    })
})

closeButton.addEventListener('click', ()=>{
    modalWindow.style.opacity = "0";
    modalWindow.style.visibility = "hidden";
    body.classList.remove("scroll-hidden")
})
modalWindow.addEventListener('click', (event)=>{
    if ([...event.target.classList].indexOf("modal") !== -1){
        modalWindow.style.opacity = "0";
        modalWindow.style.visibility = "hidden";
        body.classList.remove("scroll-hidden");
    }
})
if (leftButton){
    leftButton.addEventListener('click', ()=>{
        cardArr = document.querySelectorAll('.list-cards__element')
        cardArr.forEach((card)=>{
            card.addEventListener('click', ()=>{
                generateModalWindow(card);
            })
        })
    })
}
if (rightButton){
    rightButton.addEventListener('click', ()=>{
        cardArr = document.querySelectorAll('.list-cards__element')
        cardArr.forEach((card)=>{
            card.addEventListener('click', ()=>{
                generateModalWindow(card);
            })
        })
    })
}
