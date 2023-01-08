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
import Api from '../components/Api';
import {
    buttonOpenPlacePopup,
    popupCreatePlace,
    popupDelete,
    popupAvatar,
    popupAvatarInput,
    profileImage,
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
    likeCounter,
    cards,
    initialPlaces,
    formSelectors
} from '../scripts/constants.js'
import Popup from '../components/popup';
import PopupWithConfirmation from '../components/popupWithConfirmation';

// popupAvatar.classList.add('popup_is-opened');



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
    headers: {
      authorization: '220edf35-3f17-4203-881e-a1792be4e469',
      'Content-Type': 'application/json'
    }
  });

function updateCards(){
    api.getInitialCards()
    .then((res) => {
      cardList.renderItems(res);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

setInterval( updateCards, 5000);

api.getUserInfo()
    .then((res) => {
        userInfo.setUserInfo(res)
        console.log(res.avatar)
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });


function createCard(card, template) {
    const placeCard = new Card(card, template,
        (card) => {
            popupDeleteCard.open(() => {
                console.log(card);
                api.deleteCard(card._id)
                    .then((res) => {
                        updateCards();
                    })
                    .catch((err) => {
                        console.log(err); // выведем ошибку в консоль
                    });
                popupDeleteCard.close();
                
            })
        },
        (card) => {
            popupImage.open(card.name, card.link)
        },
        (card) => {
           if(card.checkLiked(userInfo.getUserId())) {
            api.removeLike(card._id)
                .then((res) => {
                    card.updateLikeList(res.likes)
                    card.changeStatusLikeButton();
                })
                .catch((err) => {
                    
                    console.log(err); // выведем ошибку в консоль
                });
           } else {
            
            api.putLike(card._id)
                .then((res) => {
                    card.updateLikeList(res.likes)
                    card.changeStatusLikeButton();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
           }
        });
    return placeCard.createPlace(userInfo.getUserId());
}



const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item, placeTemplate)
        cardList.addItem(cardElement);
    }
}, placesBoxSelector);

// cardList.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__job');


const popupChangeAvatar =new PopupWithForm('#popup-avatar', (values) => {
    
    api.changeAvatar({ avatar: values[popupAvatarInput.name]})
    .then((res)=>{
        userInfo.updateAvatar(res.avatar);
        popupChangeAvatar.close()
    })
    .catch((res) => {
        console.log(res);
    })
    popupPlaceForm.close();
})


const popupDeleteCard = new PopupWithConfirmation ('#popup-delete');
const popupImage = new PopupWithImage('#popup-image');

const popupPlaceForm = new PopupWithForm('#popup-add', (values) => {
    
    api.postNewCard({name: values[placeNamePopup.name], link: values[placeLinkPopup.name]})
    .then((res)=>{
        updateCards(); 
        // const cardElement = createCard(values[placeNamePopup.name], values[placeLinkPopup.name], placeTemplate)
        // cardList.addItem(cardElement);
    })
    .catch((res) => {
        console.log(res);
    })
    popupPlaceForm.close();
})

const popupProfileForm = new PopupWithForm('#popup-edit', (values) => {
    api.patchUserInfo({name : values[namePopupEditProfile.name], about: values[jobPopupEditProfile.name]})
    .then((res)=>{
        userInfo.setUserInfo(res.name, res.about)
    })
    .catch((res) => {
        console.log(res);
    })
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


profileImage.addEventListener('click', function () {
    validatePopupAvatar.clearErrors();
    popupChangeAvatar.open()
})

const validatePopupAvatar = new FormValidator(document.querySelector('#avatar-form'), formSelectors);
validatePopupAvatar.enableValidation();
const validatePopupPlace = new FormValidator(document.querySelector('#place-form'), formSelectors);
validatePopupPlace.enableValidation();
const validatePopupProfile = new FormValidator(document.querySelector('#profile-form'), formSelectors);
validatePopupProfile.enableValidation();