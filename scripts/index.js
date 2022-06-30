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
const buttonCloseEditPopup = popupEditProfile.querySelector('.popup__close-button');
const namePopupEditProfile = popupEditProfile.querySelector('.form__input:first-of-type');
const jobPopupEditProfile = popupEditProfile.querySelector('.form__input:last-of-type');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');



function addLikeButtonListener(button) {
    button.addEventListener('click', (evt) => evt.currentTarget.classList.toggle('places__like-button_active'))
}

function addDeleteButtonListener(button) {
    button.addEventListener('click', (evt) => evt.currentTarget.closest('.places__place').remove())
}

function addImageListener(card) {
    card.querySelector('.places__image').addEventListener('click', function (evt) {
        openPopup(imagePopup);
        imagePopupImage.src = evt.currentTarget.src;
        imagePopupImage.alt = evt.currentTarget.alt;
        imagePopupTitle.textContent = card.querySelector('.places__title').textContent; //Если я передам сюда переменную с картинкой
        // (из addPlace),а не карточку, то как я не смогу взять title для попапа.
    });

}


function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}


function closePopup(popup) { 
    popup.classList.remove('popup_is-opened');
}


function savePopup(popup,evt) {
    evt.preventDefault();
    switch (popup) {
        case popupAddPlace:
            let placeCard = addPlace(placeNamePopup.value, placeLinkPopup.value);
            placesBox.prepend(placeCard);
            closePopup(popupAddPlace);
            break;
        case popupEditProfile:
            nameProfile.textContent = namePopupEditProfile.value;
            jobProfile.textContent = jobPopupEditProfile.value;
            closePopup(popupEditProfile);
            break;
    }
}

function addPlace(nameValue, linkValue) {
    const placeContainer = placeTemplate.querySelector('.places__place').cloneNode(true);
    let placeImage = placeContainer.querySelector('.places__image');
    placeImage.src = `${linkValue}`;
    placeImage.alt = `Фото ${nameValue}`;
    placeContainer.querySelector('.places__title').textContent = `${nameValue}`;
    addLikeButtonListener(placeContainer.querySelector('.places__like-button'));
    addDeleteButtonListener(placeContainer.querySelector('.places__delete-button'));
    addImageListener(placeContainer); // я не могу передать в слушатель placeImage, потому что мне нужен title для попапа.
    return placeContainer
}

initialPlaces.forEach(function (place) {
    let placeCard = addPlace(place.name, place.link)
    placesBox.prepend(placeCard);
});

buttonOpenPlacePopup.addEventListener('click', function() {
    openPopup(popupAddPlace);
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
});
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupAddPlace));
popupAddPlace.addEventListener('submit',(evt) =>  savePopup(popupAddPlace,evt))
buttonCloseImagePopup.addEventListener('click', () => closePopup(imagePopup));
buttonOpenEditProfile.addEventListener('click', function() {
    openPopup(popupEditProfile);
    namePopupEditProfile.value = nameProfile.textContent;
    jobPopupEditProfile.value = jobProfile.textContent; 
});
buttonCloseEditPopup.addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfile.addEventListener('submit', (evt) =>  savePopup(popupEditProfile,evt))