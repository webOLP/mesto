const buttonOpenPlacePopup = document.querySelector('.profile__add-button');
const popupCreatePlace = document.querySelector('#popup-add');
const placeTemplate = document.querySelector('#place-template').content;
const placeNamePopup = popupCreatePlace.querySelector('.form__input:first-of-type');
const placeLinkPopup = popupCreatePlace.querySelector('.form__input:last-of-type');
const placesBox = document.querySelector('.places');
const places = document.querySelector('.places');
const buttonsLike = places.querySelectorAll('.places__like-button');
const buttonsDelete = places.querySelectorAll('.places__delete-button');
const imagePopup = document.querySelector('#popup-image');
const imagePopupImage = imagePopup.querySelector('.popup__image')
const imagePopupTitle = imagePopup.querySelector('.popup__title')
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

function renderCard(card) {
    placesBox.prepend(card);
}

function addImageListener(nameValue, linkValue) {
    openPopup(imagePopup);
    imagePopupImage.src = `${linkValue}`;
    imagePopupImage.alt = `Фото ${nameValue}`;
    imagePopupTitle.textContent = `${nameValue}`
}

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape)
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape)
}

function addOverlayClickListener(popup, evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(popup);
    }
}

function createPlace(nameValue, linkValue) {
    const placeContainer = placeTemplate.querySelector('.places__place').cloneNode(true);
    const placeImage = placeContainer.querySelector('.places__image');
    placeImage.src = `${linkValue}`;
    placeImage.alt = `Фото ${nameValue}`;
    placeContainer.querySelector('.places__title').textContent = `${nameValue}`;
    placeContainer.querySelector('.places__like-button').addEventListener('click', function (evt) {
        evt.currentTarget.classList.toggle('places__like-button_active')
    });
    placeContainer.querySelector('.places__delete-button').addEventListener('click', function (evt) {
        evt.currentTarget.closest('.places__place').remove()
    });
    placeImage.addEventListener('click', () => addImageListener(nameValue, linkValue))
    return placeContainer
}



initialPlaces.forEach(function (place) {
    const placeCard = createPlace(place.name, place.link)
    renderCard(placeCard);
});

buttonOpenPlacePopup.addEventListener('click', function () {
    openPopup(popupCreatePlace);
    const saveButton = popupCreatePlace.querySelector('.form__save-button')
    saveButton.setAttribute('disabled', 'true');
    saveButton.classList.add('form__save-button_inactive');
    placeNamePopup.value = '';
    placeLinkPopup.value = '';
});

popupCreatePlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const placeCard = createPlace(placeNamePopup.value, placeLinkPopup.value);
    renderCard(placeCard);
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