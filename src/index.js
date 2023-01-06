import './pages/index.css';

import {Card} from './components/card.js'
import {initialPlaces} from './scripts/constants.js'
import {FormValidator} from './components/formValidator.js'
import Section from './components/section.js';
import PopupWithImage from './components/popupWithImage.js';
import PopupWithForm from './components/popupWithForm.js';
import UserInfo from './components/userInfo.js';

const buttonOpenPlacePopup = document.querySelector('.profile__add-button');
const popupCreatePlace = document.querySelector('#popup-add');
const placeTemplate = document.querySelector('#place-template').content;
const placeNamePopup = popupCreatePlace.querySelector('.form__input:first-of-type');
const placeLinkPopup = popupCreatePlace.querySelector('.form__input:last-of-type');
export const placesBox = document.querySelector('.places');
const placesBoxSelector = '.places';

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
const cards = initialPlaces;


function createCard(name, link, template){
    const placeCard = new Card(name, link, template, (card) => {
        const cardsClone = cards.filter((oldCard) => oldCard.link != card.link)
        cards.length = 0;
        cardsClone.forEach((card)=>{
            cards.push(card);
        });
        cardList.renderItems();
    },
    (card) => {
        popupImage.open(card.name, card.link)
    });
    return placeCard.createPlace();
}



const cardList = new Section({ data: cards, renderer : (item) => {
    const cardElement = createCard(item.name, item.link, placeTemplate)
    cardList.addItem(cardElement);
    }
  }, placesBoxSelector);

cardList.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__job');




const popupImage = new PopupWithImage('#popup-image')

const popupPlaceForm = new PopupWithForm('#popup-add', (values) =>{
    cards.push({name : values[placeNamePopup.name], link : values[placeLinkPopup.name]});
    cardList.renderItems();
    popupPlaceForm.close();
} )

const popupProfileForm = new PopupWithForm('#popup-edit', (values) =>{
    userInfo.setUserInfo(values[namePopupEditProfile.name], values[jobPopupEditProfile.name])
    popupProfileForm.close();
} )

buttonOpenPlacePopup.addEventListener('click', function () {
    popupPlaceForm.open();
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
    validatePopupPlace.clearErrors();
});



buttonOpenEditProfile.addEventListener('click', function () {
    popupProfileForm.open();
    const info = userInfo.getUserInfo();
    namePopupEditProfile.value = info.name;
    jobPopupEditProfile.value = info.about;
    validatePopupProfile.clearErrors();
});



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




