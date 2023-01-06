import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitter) {
        super(popupSelector);
        this._submitter = submitter;
    }

    _getInputValues() {
        const inputValues = {};
        this._popup.querySelectorAll('input').forEach(element => inputValues[element.name] = element.value);
        return inputValues;
    }

    _setEventListeners() {
        super._setEventListeners();
        const that = this;
        this._popup.addEventListener('submit', function (evt) {
            evt.preventDefault();
            that._submitter(that._getInputValues());
        });
    }

    close() {
        super.close();
        this._popup.querySelector('.form').reset();
    }

}