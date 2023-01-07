export const initialPlaces = [
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

export const buttonOpenPlacePopup = document.querySelector('.profile__add-button');
export const popupCreatePlace = document.querySelector('#popup-add');
export const placeTemplate = document.querySelector('#place-template').content;
export const placeNamePopup = popupCreatePlace.querySelector('.form__input:first-of-type');
export const placeLinkPopup = popupCreatePlace.querySelector('.form__input:last-of-type');
export const placesBox = document.querySelector('.places');
export const placesBoxSelector = '.places';
export const imagePopup = document.querySelector('#popup-image');
export const imagePopupImage = imagePopup.querySelector('.popup__image');
export const imagePopupTitle = imagePopup.querySelector('.popup__title');
export const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('#popup-edit');
export const namePopupEditProfile = popupEditProfile.querySelector('.form__input:first-of-type');
export const jobPopupEditProfile = popupEditProfile.querySelector('.form__input:last-of-type');
export const cards = [];
export const formSelectors = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};
