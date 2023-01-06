export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._setEventListeners();
    }

    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this))
    }

    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')) {
                this.close()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close()
            }
        })
    }

}