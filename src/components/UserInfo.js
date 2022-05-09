export default class UserInfo {
  constructor({ nameElementSelector, infoElementSelector } ) {
    this._name = document.querySelector(nameElementSelector);
    this._info = document.querySelector(infoElementSelector);
  }
  getUserInfo() {
    const profile = {
      name: this._name.textContent,
      bio: this._info.textContent,
    };
    return profile;
  }
  setUserInfo(profile) {
    this._name.textContent = profile.name;
    this._info.textContent = profile.profession;
  }
}


