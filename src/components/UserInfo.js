export default class UserInfo {
	constructor(nameSelector, professionSelector, avatarSelector) {
		this._userName = document.querySelector(nameSelector)
		this._userProfession = document.querySelector(professionSelector)
    this._userAvatar = document.querySelector(avatarSelector)
	}

	getUserInfo() {
		return {
			userName: this._userName.textContent,
			userProfession: this._userProfession.textContent
		}
	}

	setUserInfo(data) {
		this._userName.textContent = data['profile-titel']
		this._userProfession.textContent = data['profile-subtitel']
	}

  setUserAvatar(avatarLink) {
    this._userAvatar.style.backgroundImage = `url(${avatarLink})`;
  }

  setUserId(userID) {
    this._userID = userID;
  }

  getUserId() {
    return this._userID;
  }
}
