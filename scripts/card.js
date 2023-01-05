import {
    imagePopup,
    imagePopupImage,
    openPopup,
    imagePopupTitle
} from './index.js';

export class Card {
    constructor(name, link, template){
        this._name = name;
        this._link = link;
        this._template = template;
        this._container = this._template.querySelector('.places__place').cloneNode(true);
        this._image = this._container.querySelector('.places__image');
    }
    
    _addEventListeners() {
        this._container.querySelector('.places__like-button').addEventListener('click', (evt) => this._toggleLike(evt));
        this._container.querySelector('.places__delete-button').addEventListener('click', (evt) => this._deleteCard(evt));
        this._image.addEventListener('click', () => this._handleImageClick());
    }

    _toggleLike(evt) {
        evt.currentTarget.classList.toggle('places__like-button_active');
    }

    _deleteCard(evt) {
        evt.currentTarget.closest('.places__place').remove();
    }

    _handleImageClick() {
        openPopup(imagePopup);
        imagePopupImage.src = `${this._link}`;
        imagePopupImage.alt = `Фото ${this._name}`;
        imagePopupTitle.textContent = `${this._name}`
    }

    createPlace() {
        this._image.src = `${this._link}`;
        this._image.alt = `Фото ${this._name}`;
        this._container.querySelector('.places__title').textContent = `${this._name}`;
        this._addEventListeners();
        return this._container;
    }
}