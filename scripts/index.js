import {card} from './card.js'
import {initialPlaces} from './cards.js'
import {validation} from './validate.js'


const buttonOpenPlacePopup = document.querySelector('.profile__add-button');
const popupCreatePlace = document.querySelector('#popup-add');
const placeTemplate = document.querySelector('#place-template').content;
const placeNamePopup = popupCreatePlace.querySelector('.form__input:first-of-type');
const placeLinkPopup = popupCreatePlace.querySelector('.form__input:last-of-type');
export const placesBox = document.querySelector('.places');
const places = document.querySelector('.places');
const buttonsLike = places.querySelectorAll('.places__like-button');
const buttonsDelete = places.querySelectorAll('.places__delete-button');
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
    const placeCard = new card(place.name,place.link,placeTemplate);
    placeCard.createPlace();
    
});

buttonOpenPlacePopup.addEventListener('click', function () {
    
    openPopup(popupCreatePlace);
    const saveButton = popupCreatePlace.querySelector('.form__save-button')
    saveButton.setAttribute('disabled', 'true');
    saveButton.classList.add('form__save-button_inactive');
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
    document.querySelector('.form__input').dispatchEvent(new Event('input'));

});

popupCreatePlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const placeCard = new card(placeNamePopup.value, placeLinkPopup.value,placeTemplate);
    placeCard.createPlace();
    closePopup(popupCreatePlace);
});

buttonOpenEditProfile.addEventListener('click', function () {
    openPopup(popupEditProfile);
    namePopupEditProfile.value = nameProfile.textContent;
    jobPopupEditProfile.value = jobProfile.textContent;
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

const validatePopupPlace = new validation('.form',
'.form__input',
'.form__save-button',
'form__save-button_inactive',
'form__input_type_error',
'form__input-error_active');
validatePopupPlace.enableValidation();




