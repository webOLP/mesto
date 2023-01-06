import Popup from "./popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }


    open(name, link){
        super.open();
        this._popup.src = `${link}`;
        this._popup.alt = `Фото ${name}`;
        // imagePopupTitle.textContent = `${this._name}`
    }

}