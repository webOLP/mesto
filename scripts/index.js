import {Card} from './card.js'
import {initialPlaces} from './cards.js'
import {FormValidator} from './validate.js'


const buttonOpenPlacePopup = document.querySelector('.profile__add-button');
const popupCreatePlace = document.querySelector('#popup-add');
const placeTemplate = document.querySelector('#place-template').content;
const placeNamePopup = popupCreatePlace.querySelector('.form__input:first-of-type');
const placeLinkPopup = popupCreatePlace.querySelector('.form__input:last-of-type');
export const placesBox = document.querySelector('.places');
const places = document.querySelector('.places');

export const imagePopup = document.querySelector('#popup-image');
export const imagePopupImage = imagePopup.querySelector('.popup__image');
export const imagePopupTitle = imagePopup.querySelector('.popup__title');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-edit');
const namePopupEditProfile = popupEditProfile.querySelector('.form__input:first-of-type');
const jobPopupEditProfile = popupEditProfile.querySelector('.form__input:last-of-type');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const popupList = document.querySelectorAll('.popup');



function createCard(name, link, template){
    const placeCard = new Card(name, link, template);
    return placeCard.createPlace();
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened') 
      closePopup(openedPopup);
    }
  }



export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape)
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape)
}


initialPlaces.forEach(function (place) {
    placesBox.prepend(createCard(place.name, place.link, placeTemplate));
});

buttonOpenPlacePopup.addEventListener('click', function () {
    openPopup(popupCreatePlace);
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
    validatePopupPlace.clearErrors();
});

popupCreatePlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    placesBox.prepend(createCard(placeNamePopup.value, placeLinkPopup.value, placeTemplate));
    closePopup(popupCreatePlace);
});

buttonOpenEditProfile.addEventListener('click', function () {
    openPopup(popupEditProfile);
    namePopupEditProfile.value = nameProfile.textContent;
    jobPopupEditProfile.value = jobProfile.textContent;
    validatePopupProfile.clearErrors();
});

popupEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    nameProfile.textContent = namePopupEditProfile.value;
    jobProfile.textContent = jobPopupEditProfile.value;
    closePopup(popupEditProfile);
})

popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

const formSelectors = {
    inputSelector : '.form__input',
    submitButtonSelector : '.form__save-button',
    inactiveButtonClass : 'form__save-button_inactive',
    inputErrorClass : 'form__input_type_error',
    errorClass : 'form__input-error_active'
};

const validatePopupPlace = new FormValidator(document.querySelector('#place-form'), formSelectors);
validatePopupPlace.enableValidation();
const validatePopupProfile = new FormValidator(document.querySelector('#profile-form'), formSelectors);
validatePopupProfile.enableValidation();




