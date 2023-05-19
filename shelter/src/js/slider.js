import petsInfo from "../pets.json";

const countPetCards = 8;
const countElements = 3;
function generateNewArr(sliderArr, index){
    let newArr = []
    for (let i = 0; i < countElements; i++){
        let new_element = Math.floor(Math.random() * (countPetCards-0.55));
        while (!(newArr.indexOf(new_element) === -1 && (index === 0 || index !== 0 && sliderArr[index-1].indexOf(new_element) === -1) && (index ===2 || index !== 2 && sliderArr[index+1].indexOf(new_element) === -1))){
            new_element = Math.floor(Math.random() * (countPetCards-0.55));
        }
        newArr.push(new_element);
    }
    return newArr
}
function initCards(){
    let sliderArr = [[], [], []]
    for (let index = 0; index < 3; index++){
        sliderArr[index] = generateNewArr(sliderArr, index);
    }
    return sliderArr;
}
function moveLeftStep(sliderArr){
    let newSliderArr = [[], [], []];
    newSliderArr[2] = sliderArr[1];
    newSliderArr[1] = sliderArr[0];
    newSliderArr[0] = generateNewArr(newSliderArr, 0);
    return newSliderArr;
}
function moveRightStep(sliderArr){
    let newSliderArr = [[], [], []];
    newSliderArr[0] = sliderArr[1];
    newSliderArr[1] = sliderArr[2];
    newSliderArr[2] = generateNewArr(newSliderArr, 2);
    return newSliderArr;
}

const leftButton = document.querySelector('#left-slider-btn')
const rightButton = document.querySelector('#right-slider-btn')
const carousel = document.querySelector("#carousel");
const cardArr = document.querySelectorAll(".list-cards__element");

const moveLeft = () => {
    carousel.classList.add("transition-left");
    leftButton.removeEventListener("click", moveLeft);
    rightButton.removeEventListener("click", moveRight);
};

const moveRight = () => {
    carousel.classList.add("transition-right");
    leftButton.removeEventListener("click", moveLeft);
    rightButton.removeEventListener("click", moveRight);
};
const cardsRenderingInit = (sliderArr) => {
    cardArr.forEach((card, index)=>{
        const html =
            `<img src=${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].img} alt='${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].name} photo'>
             <p class="name">${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].name}</p>
             <button class="button button_border">Learn more</button>`;
        card.innerHTML = '';
        card.insertAdjacentHTML("afterbegin", html);
        card.id = sliderArr[Math.trunc(index/3)][index%3];
    })
}

const cardsRenderingRight = (sliderArr) => {
    const listCardsArr = document.querySelectorAll(".list-cards");
    listCardsArr[0].remove()
    const listCards = document.createElement('div')
    listCards.classList.add("list-cards",  "main-page__list-cards",  "slider__content")
    carousel.insertAdjacentElement('beforeend', listCards);
    for (let index = 6; index < cardArr.length; index++){
        const html =
            `<div class="list-cards__element" id="${sliderArr[Math.trunc(index/3)][index%3]}">
                <img src=${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].img} alt='${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].name} photo'>
                <p class="name">${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].name}</p>
                <button class="button button_border">Learn more</button>
            </div>`;
        listCards.insertAdjacentHTML("beforeend", html);

    }
}

const cardsRenderingLeft = (sliderArr) => {
    const listCardsArr = document.querySelectorAll(".list-cards");
    listCardsArr[2].remove()
    const listCards = document.createElement('div')
    listCards.classList.add("list-cards",  "main-page__list-cards",  "slider__content")
    carousel.insertAdjacentElement('afterbegin', listCards);
    for (let index = 0; index < 3; index++){
        const html =
            `<div class="list-cards__element" id="${sliderArr[Math.trunc(index/3)][index%3]}">
                <img src=${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].img} alt='${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].name} photo'>
                <p class="name">${petsInfo[sliderArr[Math.trunc(index/3)][index%3]].name}</p>
                <button class="button button_border">Learn more</button>
            </div>`;
        listCards.insertAdjacentHTML("beforeend", html);

    }
}

if (window.location.toString().indexOf('index.html') !== -1){
    let sliderCards = initCards();
    cardsRenderingInit(sliderCards);
    leftButton.addEventListener('click', ()=>{
        moveLeft();
    })
    rightButton.addEventListener('click', ()=>{
        moveRight();
    })
    carousel.addEventListener("animationend", (animationEvent) => {
        if (animationEvent.animationName.includes("move-left")) {
            carousel.classList.remove("transition-left");
            sliderCards = moveLeftStep(sliderCards);
            cardsRenderingLeft(sliderCards);
        } else {
            carousel.classList.remove("transition-right");
            sliderCards = moveRightStep(sliderCards);
            cardsRenderingRight(sliderCards);
        }
        leftButton.addEventListener("click", moveLeft);
        rightButton.addEventListener("click", moveRight);
    })
}
