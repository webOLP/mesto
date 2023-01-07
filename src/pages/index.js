import './index.css';

import {
    Card
} from '../components/card.js'

import {
    FormValidator
} from '../components/formValidator.js'
import Section from '../components/section.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import {
    buttonOpenPlacePopup,
    popupCreatePlace,
    placeTemplate,
    placeNamePopup,
    placeLinkPopup,
    placesBox,
    placesBoxSelector,
    imagePopup,
    imagePopupImage,
    imagePopupTitle,
    buttonOpenEditProfile,
    popupEditProfile,
    namePopupEditProfile,
    jobPopupEditProfile,
    cards,
    initialPlaces,
    formSelectors
} from '../scripts/constants.js'



function createCard(name, link, template) {
    const placeCard = new Card(name, link, template,
        (card) => {
            popupImage.open(card.name, card.link)
        });
    return placeCard.createPlace();
}



const cardList = new Section({
    data: initialPlaces,
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link, placeTemplate)
        cardList.addItem(cardElement);
    }
}, placesBoxSelector);

cardList.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__job');




const popupImage = new PopupWithImage('#popup-image')

const popupPlaceForm = new PopupWithForm('#popup-add', (values) => {
    const cardElement = createCard(values[placeNamePopup.name], values[placeLinkPopup.name], placeTemplate)
    cardList.addItem(cardElement);
    popupPlaceForm.close();
})

const popupProfileForm = new PopupWithForm('#popup-edit', (values) => {
    userInfo.setUserInfo(values[namePopupEditProfile.name], values[jobPopupEditProfile.name])
    popupProfileForm.close();
})

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





const validatePopupPlace = new FormValidator(document.querySelector('#place-form'), formSelectors);
validatePopupPlace.enableValidation();
const validatePopupProfile = new FormValidator(document.querySelector('#profile-form'), formSelectors);
validatePopupProfile.enableValidation();