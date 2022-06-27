const openAddPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#popup-add');
const closeAddPlacePopupButton = addPlacePopup.querySelector('.popup__close-button');
let placeNamePopup = addPlacePopup.querySelectorAll('.form__input')[0];
let placeLinkPopup = addPlacePopup.querySelectorAll('.form__input')[1];
let placesBox = document.querySelector('.places');


function openPopup() {
    addPlacePopup.classList.add('popup_is-opened');
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
}

function closePopup() {
    addPlacePopup.classList.remove('popup_is-opened');
}

function popupOverlayClick(evt) {
    if(evt.target === evt.currentTarget){
        addPlacePopup.classList.remove('popup_is-opened'); 
    }
}

function savePopup(evt) {
    evt.preventDefault();
    addPlace(placeNamePopup.value,placeLinkPopup.value);
    closePopup();
}

function addPlace(nameValue,linkValue) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeContainer = placeTemplate.querySelector('.places__place').cloneNode(true);
    placeContainer.querySelector('.places__image').src = `${linkValue}`;
    placeContainer.querySelector('.places__title').textContent = `${nameValue}`;
    placesBox.prepend(placeContainer);
}


openAddPlaceButton.addEventListener('click', openPopup);
closeAddPlacePopupButton.addEventListener('click', closePopup);
addPlacePopup.addEventListener('click',popupOverlayClick)
addPlacePopup.addEventListener('submit', savePopup)