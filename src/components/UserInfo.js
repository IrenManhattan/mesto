export default class UserInfo {
  constructor({ nameElementSelector, infoElementSelector, avatarElementSelector } ) {
    this._name = document.querySelector(nameElementSelector);
    this._info = document.querySelector(infoElementSelector);
    this._avatar = document.querySelector(avatarElementSelector);
  }
  getUserInfo() {
    const profile = {
      name: this._name.textContent,
      bio: this._info.textContent,
      avatar: this._avatar.src
    };
    return profile;
  }
  setUserInfo(profile) {
    this._name.textContent = profile.name;
    this._info.textContent = profile.profession;
  }
  setAvatar(avatar) {
    this._avatar.src = avatar;
 }
}


