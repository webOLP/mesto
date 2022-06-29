const openAddPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#popup-add');
const closeAddPlacePopupButton = addPlacePopup.querySelector('.popup__close-button');
let placeNamePopup = addPlacePopup.querySelectorAll('.form__input')[0];
let placeLinkPopup = addPlacePopup.querySelectorAll('.form__input')[1];
let placesBox = document.querySelector('.places');
const places = document.querySelector('.places');
const likeButtons = places.querySelectorAll('.places__like-button');
const deleteButtons = places.querySelectorAll('.places__delete-button');
const imagePopup = document.querySelector('#popup-image');
const closeImagePopupButton = imagePopup.querySelector('.popup__close-button')
const imagePopupImage = imagePopup.querySelector('.popup__image')
const imagePopupTitle = imagePopup.querySelector('.popup__title')
const initialPlaces = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function likeButtonListener(button) {
    button.addEventListener('click', (evt) => evt.currentTarget.classList.toggle('places__like-button_active')) 
}    

/*Вероятно, лучше не использовать и стрелочные функции и функциональные выражения 
в одном коде, чтобы не было путаницы, но мне было интересно опробовать на деле новые знания*/

function deleteButtonListener(button){
    button.addEventListener('click', (evt) => evt.currentTarget.closest('.places__place').remove())
}

function imageListener(card,image,title){
    image.addEventListener('click', function(evt){
        if(evt.currentTarget === image) {
            imagePopup.classList.add('popup_is-opened');
            imagePopupImage.src = image.src
            imagePopupTitle.textContent = title.textContent;
        }
    });

}


function openPopup() {
    addPlacePopup.classList.add('popup_is-opened');
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
}

function closePopup() {
    addPlacePopup.classList.remove('popup_is-opened');
}

function popupOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        addPlacePopup.classList.remove('popup_is-opened');
    }
}

function savePopup(evt) {
    evt.preventDefault();
    let placeCard = addPlace(placeNamePopup.value, placeLinkPopup.value);
    likeButtonListener(placeCard.querySelector('.places__like-button'));
    deleteButtonListener(placeCard.querySelector('.places__delete-button'));
    imageListener(placeCard, placeCard.querySelector('.places__image'), placeCard.querySelector('.places__title'));
    placesBox.prepend(placeCard);
    closePopup();
}

function addPlace(nameValue, linkValue) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeContainer = placeTemplate.querySelector('.places__place').cloneNode(true);
    placeContainer.querySelector('.places__image').src = `${linkValue}`;
    placeContainer.querySelector('.places__title').textContent = `${nameValue}`;
    return placeContainer
    
   
}

initialPlaces.forEach(function(place){
    let placeCard = addPlace(place.name,place.link)
    likeButtonListener(placeCard.querySelector('.places__like-button'));
    deleteButtonListener(placeCard.querySelector('.places__delete-button'));
    imageListener(placeCard, placeCard.querySelector('.places__image'), placeCard.querySelector('.places__title'));
    placesBox.prepend(placeCard);
});
openAddPlaceButton.addEventListener('click', openPopup);
closeAddPlacePopupButton.addEventListener('click', closePopup);
addPlacePopup.addEventListener('click', popupOverlayClick)
addPlacePopup.addEventListener('submit', savePopup)
closeImagePopupButton.addEventListener('click', function(){
    imagePopup.classList.remove('popup_is-opened')
})