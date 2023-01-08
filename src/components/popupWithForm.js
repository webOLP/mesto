import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitter) {
        super(popupSelector);
        this._submitter = submitter;
        this._inputList = this._popup.querySelectorAll('input');
        this._form = this._popup.querySelector('.form')
        this._submitButton = this._form.querySelector('.form__save-button')
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
            that.renderLoading(true);
            that._submitter(that._getInputValues());
        });
    }

    renderLoading(state){
        if (state) {
            this._submitButton.innerHTML = 'Сохранить...';
        } else {
            this._submitButton.innerHTML = 'Сохранить';
        }
    }

    close() {
        super.close();
        this.reset();
    }

    reset(){
        this._form.reset();
    }
}