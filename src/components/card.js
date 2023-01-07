export class Card {
    constructor(name, link, template, handleCardClick){
        this._name = name;
        this._link = link;
        this._template = template;
        this._container = this._template.querySelector('.places__place').cloneNode(true);
        this._image = this._container.querySelector('.places__image');;
        this._handleImageClick = handleCardClick;
        this._likeButton = this._container.querySelector('.places__like-button');
        this._deleteButton = this._container.querySelector('.places__delete-button');
        this._title = this._container.querySelector('.places__title');
    }
    
    _addEventListeners() {
        this._likeButton.addEventListener('click', (evt) => this._toggleLike(evt));
        this._deleteButton.addEventListener('click', (evt) => this._deleteCard(evt));
        this._image.addEventListener('click', () => this._handleImageClick({name : this._name, link : this._link}));
    }

    _toggleLike(evt) {
        evt.currentTarget.classList.toggle('places__like-button_active');
    }

    _deleteCard(evt) {
        evt.currentTarget.closest('.places__place').remove();
    }


    createPlace() {
        this._image.src = `${this._link}`;
        this._image.alt = `Фото ${this._name}`;
        this._title.textContent = `${this._name}`;
        this._addEventListeners();
        return this._container;
    }
}