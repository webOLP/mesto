export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
          })
          .then((res) => this._getPromiseAnswer(res));
    }
  
    patchUserInfo(data){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
          })
          .then((res) => this._getPromiseAnswer(res));
    }

    postNewCard(data){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
              })
          })
          .then((res) => this._getPromiseAnswer(res));
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
          })
          .then((res) => this._getPromiseAnswer(res));
    }

    _getPromiseAnswer(res){
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
          })
          .then((res) => this._getPromiseAnswer(res));
    }

    putLike(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
          })
          .then((res) => this._getPromiseAnswer(res));
    }
    
    removeLike(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
          })
          .then((res) => this._getPromiseAnswer(res));
    }

    changeAvatar(data){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar : data.avatar
              })
          })
          .then((res) => this._getPromiseAnswer(res));
    }
  }

  