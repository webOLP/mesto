import Popup from "./popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._title = this._popup.querySelector('.popup__title');
        this._image = this._popup.querySelector('.popup__image');
    }


    open(name, link){
        super.open();
        this._image.src = `${link}`;
        this._image.alt = `Фото ${name}`;
        this._title.textContent = `${name}`
    }

}