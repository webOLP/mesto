const buttonOpenPlacePopup = document.querySelector('.profile__add-button');
const popupCreatePlace = document.querySelector('#popup-add');
const placeTemplate = document.querySelector('#place-template').content;
const buttonCloseAddPopup = popupCreatePlace.querySelector('.popup__close-button');
const placeNamePopup = popupCreatePlace.querySelector('.form__input:first-of-type');
const placeLinkPopup = popupCreatePlace.querySelector('.form__input:last-of-type');
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

function renderCard(card) {
    placesBox.prepend(card);
}

function addImageListener(image) {
    image.addEventListener('click', function (evt) {
        openPopup(imagePopup);
        imagePopupImage.src = evt.currentTarget.src;
        imagePopupImage.alt = evt.currentTarget.alt;
        imagePopupTitle.textContent = image.parentNode.querySelector('.places__title').textContent;
    });

}

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

function CreatePlace(nameValue, linkValue) {
    const placeContainer = placeTemplate.querySelector('.places__place').cloneNode(true);
    let placeImage = placeContainer.querySelector('.places__image');
    placeImage.src = `${linkValue}`;
    placeImage.alt = `Фото ${nameValue}`;
    placeContainer.querySelector('.places__title').textContent = `${nameValue}`;
    placeContainer.querySelector('.places__like-button').addEventListener('click', function (evt) {
        evt.currentTarget.classList.toggle('places__like-button_active')
    });
    placeContainer.querySelector('.places__delete-button').addEventListener('click', function (evt) {
        evt.currentTarget.closest('.places__place').remove()
    });
    addImageListener(placeImage);
    return placeContainer
}



initialPlaces.forEach(function (place) {
    let placeCard = CreatePlace(place.name, place.link)
    renderCard(placeCard);
});

buttonOpenPlacePopup.addEventListener('click', function () {
    openPopup(popupCreatePlace);
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
});
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupCreatePlace));
popupCreatePlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let placeCard = CreatePlace(placeNamePopup.value, placeLinkPopup.value);
    renderCard(placeCard);
    closePopup(popupCreatePlace);
});
buttonCloseImagePopup.addEventListener('click', () => closePopup(imagePopup));
buttonOpenEditProfile.addEventListener('click', function () {
    openPopup(popupEditProfile);
    namePopupEditProfile.value = nameProfile.textContent;
    jobPopupEditProfile.value = jobProfile.textContent;
});
buttonCloseEditPopup.addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    nameProfile.textContent = namePopupEditProfile.value;
    jobProfile.textContent = jobPopupEditProfile.value;
    closePopup(popupEditProfile);
})