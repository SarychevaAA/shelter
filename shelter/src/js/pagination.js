import petsInfo from "../pets.json";

function shuffle(arr){
    return arr.sort(() => Math.random() - 0.5);
}
function generateNewArr(){
    const countPetCards = 8;
    let newArr = Array.from({length: countPetCards}, (_, index) => index++);
    newArr = shuffle(newArr);
    return newArr;
}

function generationSubArrays(arr){
    let newArr = []
    newArr.push(...shuffle(arr.slice(0, 3)))
    newArr.push(...shuffle(arr.slice(3, 6)))
    newArr.push(...shuffle(arr.slice(6)))
    return newArr
}
function generateFullArr(){
    let patternArr = generateNewArr();
    let newArr = [];
    for (let i = 0; i < 6; i++){
        newArr.push(...generationSubArrays(patternArr))
    }
    return newArr;
}
const smallWidthMediaQuery = window.matchMedia('(max-width: 627px)');
const mediumWidthMediaQuery = window.matchMedia('(max-width: 1279px) and (min-width: 628px)');
const bigWidthMediaQuery = window.matchMedia('(min-width: 1280px)');

function mediaEvent(listCards, pageSize) {
    pageNumber = Math.ceil((pageNumber*(48/(maxCountPages+1)) + (48/(maxCountPages+1)))/pageSize)-1;
    if (bigWidthMediaQuery.matches){
        maxCountPages = 5
    }
    else if (smallWidthMediaQuery.matches){
        maxCountPages = 15
    }
    else if (mediumWidthMediaQuery.matches){
        maxCountPages = 7
    }
    changeButtonState();
    renderingSlider(sliderCards, pageNumber, pageSize);

}
function renderingSlider(sliderCards, pageNumber, pageSize){
    const listCards = document.querySelector('.pets-page__list-cards');
    const NumberButton = document.querySelector('#number-button')
    listCards.innerHTML = '';
    let startNumber = pageNumber * pageSize;
    for (let i = (startNumber); i < (startNumber+pageSize); i++){
        const index = sliderCards[i];
        const html =
            `<div class="list-cards__element" id="${index}">
                <img src=${petsInfo[index].img} alt='${petsInfo[index].name} photo'>
                <p class="name">${petsInfo[index].name}</p>
                <button class="button button_border">Learn more</button>
            </div>`;
        listCards.insertAdjacentHTML("beforeend", html);
    }
    NumberButton.innerHTML = pageNumber+1;
}

function changeButtonState(){
    if (pageNumber === maxCountPages){
        lastButton.disabled = true
        nextButton.disabled = true
        lastButton.classList.add('slider__button_not-active')
        lastButton.classList.remove('slider__button_active')
        nextButton.classList.add('slider__button_not-active')
        nextButton.classList.remove('slider__button_active')
    }
    else if (pageNumber === maxCountPages-1 || pageNumber === 0){
        lastButton.disabled = false
        nextButton.disabled = false
        lastButton.classList.remove('slider__button_not-active')
        lastButton.classList.add('slider__button_active')
        nextButton.classList.remove('slider__button_not-active')
        nextButton.classList.add('slider__button_active')
    }
    if (pageNumber === 0){
        startButton.disabled = true
        previousButton.disabled = true
        startButton.classList.add('slider__button_not-active')
        startButton.classList.remove('slider__button_active')
        previousButton.classList.add('slider__button_not-active')
        previousButton.classList.remove('slider__button_active')

    }
    else if (pageNumber === maxCountPages || pageNumber === 1){
        startButton.disabled = false
        previousButton.disabled = false
        startButton.classList.remove('slider__button_not-active')
        startButton.classList.add('slider__button_active')
        previousButton.classList.remove('slider__button_not-active')
        previousButton.classList.add('slider__button_active')
    }
}
let pageNumber = 0;
let maxCountPages = 7;
const sliderCards =  generateFullArr();
if (window.location.toString().indexOf('pets.html') !== -1){
    const listCards = document.querySelector('.pets-page__list-cards');
    smallWidthMediaQuery.addEventListener('change', (event)=>{if (event.matches) mediaEvent(listCards, 3)});
    mediumWidthMediaQuery.addEventListener('change', (event)=>{if (event.matches) mediaEvent(listCards, 6)});
    bigWidthMediaQuery.addEventListener('change', (event)=> {if (event.matches) mediaEvent(listCards, 8)});
    if (window.matchMedia("(max-width: 627px)").matches){
        maxCountPages = 15;
        renderingSlider(sliderCards, pageNumber, 3);
    }
    else if (window.matchMedia("(max-width: 1279px)").matches){
        maxCountPages = 7;
        renderingSlider(sliderCards, pageNumber, 6);
    }
    else{
        maxCountPages = 5;
        renderingSlider(sliderCards, pageNumber, 8);
    }

}
const lastButton = document.querySelector('#last-page');
const startButton = document.querySelector('#start-page')
const nextButton = document.querySelector('#next-page')
const previousButton = document.querySelector('#previous-page')
const buttons = document.querySelectorAll('.move-button')
buttons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        if (button.id === 'start-page'){
            pageNumber = 0;
        }
        else if (button.id === 'last-page'){
            pageNumber = maxCountPages;
        }
        else if (button.id === 'next-page'){
            pageNumber += 1;
        }
        else if (button.id === 'previous-page'){
            pageNumber -= 1;
        }
        changeButtonState();
        let size = (48/(maxCountPages+1));
        renderingSlider(sliderCards, pageNumber, size);
    })
})
