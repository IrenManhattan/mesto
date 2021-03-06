export class Api {
  constructor({ baseUrl, headers }) {
     this._headers = headers
     this._baseUrl = baseUrl
  }

  _checkRequest(res) {
     if (res.ok) {
        return res.json()
     }
     else {
        return Promise.reject(res.statusText)
     }
  }

  getProfile() {
     return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
     })
        .then(this._checkRequest)
  }

  getInitialCards() {
     return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
     })
        .then(this._checkRequest)
  }


  editProfile(userData) {
     return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about,
        })
     })
        .then(this._checkRequest)
  }

  editAvatar(data) {
     return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.link
        }),
     }).then(this._checkRequest)
  }

  addUserCard(data) {
     return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._checkRequest);
    }

  deleteCard(id) {
     return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
     })
        .then(this._checkRequest)
  }

  deleteLike(id) {
     return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers
     })
        .then(this._checkRequest)
  }

  addLike(id) {
     return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers
     })
        .then(this._checkRequest)
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getProfile()]);
  }
}
