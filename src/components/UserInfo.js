export default class UserInfo {
	constructor(nameSelector, professionSelector) {
		this._userName = document.querySelector(nameSelector)
		this._userProfession = document.querySelector(professionSelector)
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
}
