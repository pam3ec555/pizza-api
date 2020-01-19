class Auth {
  constructor() {
    this._token = localStorage.getItem('token');
    this._isLoggedIn = !!this._token;
  }

  get token() {
    return this._token;
  }

  set token(token) {
    localStorage.setItem('token', token);
    this._token = token;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  reset() {
    localStorage.removeItem('token');
    this._token = null;
    this._isLoggedIn = false;
  }
}

const auth = new Auth();
