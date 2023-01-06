import {Card} from './card.js'
import {initialPlaces} from './cards.js'
import {FormValidator} from './validate.js'
import Section from './section.js';
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';
import UserInfo from './userInfo.js';

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


// function closeByEscape(evt) {
//     if (evt.key === 'Escape') {
//       const openedPopup = document.querySelector('.popup_is-opened') 
//       closePopup(openedPopup);
//     }
//   }



// export function openPopup(popup) {
//     popup.classList.add('popup_is-opened');
//     document.addEventListener('keydown', closeByEscape)
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_is-opened');
//     document.removeEventListener('keydown', closeByEscape)
// }

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

// popupEditProfile.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     nameProfile.textContent = namePopupEditProfile.value;
//     jobProfile.textContent = jobPopupEditProfile.value;
//     closePopup(popupEditProfile);
// })

// popupList.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_is-opened')) {
//             closePopup(popup)
//         }
//         if (evt.target.classList.contains('popup__close-button')) {
//           closePopup(popup)
//         }
//     })
// })

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




