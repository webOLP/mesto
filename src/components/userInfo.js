export default class UserInfo {
    constructor(nameSelector, aboutSelector){
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatar = document.querySelector('.profile__image');
        
    }

    getUserInfo(){
        return {name : this._nameElement.textContent, about: this._aboutElement.textContent}
    }

    setUserInfo(data){
        this._nameElement.textContent = data.name;
        this._aboutElement.textContent = data.about;
        this._avatar.src = data.avatar;
        this._id = data._id;
    }

    getUserId(){
        return this._id;
    }

    updateAvatar(avatar){
        this._avatar.src = avatar;
    }

}