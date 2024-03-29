import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._form = this._popup.querySelector('.form')
    }

    open(conformationFunction){
        super.open();
        this._conformationFunction = conformationFunction;
        const that = this;
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            that._conformationFunction();
        });
    }

    close(){
        super.close();
        const that = this;
        this._form.removeEventListener('submit', function (evt) {
            evt.preventDefault();
            that._conformationFunction();
        });
    }

}