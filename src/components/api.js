export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
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
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }

    postNewCard(card){
        
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
            
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
        
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          

    }

  }

  