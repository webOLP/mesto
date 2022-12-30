import {placesBox} from './index.js';
import {imagePopup} from './index.js';
import {imagePopupImage} from './index.js';
import {openPopup} from './index.js';
import {imagePopupTitle} from './index.js';

export class card {
    constructor(name, link, template){
        this._name = name;
        this._link = link;
        this._template = template;
    }
    
    _addImageListener() {
        openPopup(imagePopup);
        imagePopupImage.src = `${this._link}`;
        imagePopupImage.alt = `Фото ${this._name}`;
        imagePopupTitle.textContent = `${this._name}`
    }

    createPlace() {
        
        const placeContainer = this._template.querySelector('.places__place').cloneNode(true);
        const placeImage = placeContainer.querySelector('.places__image');
        placeImage.src = `${this._link}`;
        placeImage.alt = `Фото ${this._name}`;
        placeContainer.querySelector('.places__title').textContent = `${this._name}`;
        placeContainer.querySelector('.places__like-button').addEventListener('click', function (evt) {  ////////////////////// V card
            evt.currentTarget.classList.toggle('places__like-button_active')
        });
        placeContainer.querySelector('.places__delete-button').addEventListener('click', function (evt) {
            evt.currentTarget.closest('.places__place').remove()
        });
        placeImage.addEventListener('click', () => this._addImageListener())
        this._renderCard(placeContainer);
    }

    _renderCard(card) {
        
        placesBox.prepend(card); 
        
    }
}