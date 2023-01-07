import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitter) {
        super(popupSelector);
        this._submitter = submitter;
        this._inputList = this._popup.querySelectorAll('input');
        this._form = this._popup.querySelector('.form')
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(element => inputValues[element.name] = element.value);
        return inputValues;
    }

    _setEventListeners() {
        super._setEventListeners();
        const that = this;
        this._popup.addEventListener('submit', function (evt) {
            evt.preventDefault();
            ////TODO: Сохранить......
            that._submitter(that._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

}