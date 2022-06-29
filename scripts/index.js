const buttonOpenPlacePopup = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('#popup-add');
const placeTemplate = document.querySelector('#place-template').content;
const buttonCloseAddPopup = popupAddPlace.querySelector('.popup__close-button');
const placeNamePopup = popupAddPlace.querySelector('.form__input:first-of-type');
const placeLinkPopup = popupAddPlace.querySelector('.form__input:last-of-type');
const placesBox = document.querySelector('.places');
const places = document.querySelector('.places');
const buttonsLike = places.querySelectorAll('.places__like-button');
const buttonsDelete = places.querySelectorAll('.places__delete-button');
const imagePopup = document.querySelector('#popup-image');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close-button')
const imagePopupImage = imagePopup.querySelector('.popup__image')
const imagePopupTitle = imagePopup.querySelector('.popup__title')
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-edit');
const buttonClosePopup = popupEditProfile.querySelector('.popup__close-button');
let namePopupEditProfile = popupEditProfile.querySelector('.form__input:first-of-type');
let jobPopupEditProfile = popupEditProfile.querySelector('.form__input:last-of-type');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');



function addLikeButtonListener(button) {
    button.addEventListener('click', (evt) => evt.currentTarget.classList.toggle('places__like-button_active'))
}

/*Вероятно, лучше не использовать и стрелочные функции и функциональные выражения 
в одном коде, чтобы не было путаницы, но мне было интересно опробовать на деле новые знания*/

function addDeleteButtonListener(button) {
    button.addEventListener('click', (evt) => evt.currentTarget.closest('.places__place').remove())
}

function addImageListener(card) {
    let image = card.querySelector('.places__image');
    image.addEventListener('click', function () {
        imagePopup.classList.add('popup_is-opened');
        imagePopupImage.src = image.src
        imagePopupTitle.textContent = card.querySelector('.places__title').textContent;

    });

}


function openPopup(evt) {
    switch (evt.currentTarget) {
        case buttonOpenPlacePopup:
            popupAddPlace.classList.add('popup_is-opened');
            placeNamePopup.value = '';
            placeLinkPopup.value = '';
            break;
        case buttonOpenEditProfile:
            popupEditProfile.classList.add('popup_is-opened');
            namePopupEditProfile.value = nameProfile.textContent
            jobPopupEditProfile.value = jobProfile.textContent;
    }
}


function closePopup() { 
    popupAddPlace.classList.remove('popup_is-opened');
    popupEditProfile.classList.remove('popup_is-opened');
}


function savePopup(popup,evt) {
    evt.preventDefault();
    switch (popup) {
        case popupAddPlace:
            let placeCard = addPlace(placeNamePopup.value, placeLinkPopup.value);
            placesBox.prepend(placeCard);
            closePopup();
            break;
        case popupEditProfile:
            nameProfile.textContent = namePopupEditProfile.value;
            jobProfile.textContent = jobPopupEditProfile.value;
            closePopup();
            break;
    }
}

function addPlace(nameValue, linkValue) {
    const placeContainer = placeTemplate.querySelector('.places__place').cloneNode(true);
    placeContainer.querySelector('.places__image').src = `${linkValue}`;
    placeContainer.querySelector('.places__title').textContent = `${nameValue}`;
    placeContainer.querySelector('.places__image').alt = `Фото ${nameValue}`;
    addLikeButtonListener(placeContainer.querySelector('.places__like-button'));
    addDeleteButtonListener(placeContainer.querySelector('.places__delete-button'));
    addImageListener(placeContainer);
    return placeContainer
}

initialPlaces.forEach(function (place) {
    let placeCard = addPlace(place.name, place.link)
    addLikeButtonListener(placeCard.querySelector('.places__like-button'));
    addDeleteButtonListener(placeCard.querySelector('.places__delete-button'));
    addImageListener(placeCard); /////////////////
    placesBox.prepend(placeCard);
});
buttonOpenPlacePopup.addEventListener('click', openPopup);
buttonCloseAddPopup.addEventListener('click', closePopup);
popupAddPlace.addEventListener('submit',(evt) =>  savePopup(popupAddPlace,evt))
buttonCloseImagePopup.addEventListener('click', function () {
    imagePopup.classList.remove('popup_is-opened')
})
buttonOpenEditProfile.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
popupEditProfile.addEventListener('submit', (evt) =>  savePopup(popupEditProfile,evt))