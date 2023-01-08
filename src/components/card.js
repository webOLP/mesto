export class Card {
    constructor(data, template, deleter, handleCardClick, handleToggleLike) {
        this._name = data.name;
        this._link = data.link;
        this._likeCounter = data.likes.length;
        this._likesList = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._template = template;
        this._container = this._template.querySelector('.places__place').cloneNode(true);
        this._image = this._container.querySelector('.places__image');
        this._handleImageClick = handleCardClick;
        this._likeButton = this._container.querySelector('.places__like-button');
        this._deleteButton = this._container.querySelector('.places__delete-button');
        this._title = this._container.querySelector('.places__title');
        this._likes = this._container.querySelector('.places__like-counter');
        this._deleter = deleter;
        this._handleToggleLike = handleToggleLike;
    }

    _addEventListeners() {
        this._likeButton.addEventListener('click', (evt) => this._handleToggleLike(this));
        this._deleteButton.addEventListener('click', (evt) => this._handleDeleteCard(evt));
        this._image.addEventListener('click', () => this._handleImageClick({
            name: this._name,
            link: this._link
        }));
    }

    checkLiked(myId) {
        return this._likesList.find((userLike) => {
            if (userLike._id === myId) return true
        })
    }
 
    updateLikeList(list) {
        this._likesList = list;
        this._likeCounter = this._likesList.length;
        this._likes.textContent = this._likeCounter;
    }

    changeStatusLikeButton() {
        this._likeButton.classList.toggle('places__like-button_active');
    }


    _handleDeleteCard(evt) {
        this._deleter(this);
    }

    checkMyCard(myId) {
        return this._owner._id === myId;
    }

    createPlace(myId) {
        this._image.src = `${this._link}`;
        this._image.alt = `Фото ${this._name}`;
        this._title.textContent = `${this._name}`;
        this._likes.textContent = `${this._likeCounter}`;
        this._addEventListeners();
        if (this.checkLiked(myId)) {
            this.changeStatusLikeButton()
        };
        if (!this.checkMyCard(myId)) this._deleteButton.remove();
        return this._container;
    }
}