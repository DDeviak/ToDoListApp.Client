import { action, computed, makeObservable, observable } from "mobx";
import User, { UserAuthenticationResponse } from "../models/user.model";

export default class UserStore {
  user: User | null = null;
  private static tokenStorageKey = "token";
  constructor() {
    makeObservable(this, {
      user: observable,
      isLoggedIn: computed,
      setUser: action,
      setFromAuthResponse: action,
      logout: action,
    });
  }
  static get token() {
    return localStorage.getItem(UserStore.tokenStorageKey);
  }
  static setToken(token: string) {
    localStorage.setItem(UserStore.tokenStorageKey, token);
  }
  get isLoggedIn() {
    return !!this.user;
  }
  setUser = (user: User) => {
    this.user = user;
  };
  setFromAuthResponse = (response: UserAuthenticationResponse) => {
    localStorage.setItem(UserStore.tokenStorageKey, response.token);
    this.user = response.user;
  };
  logout = () => {
    this.user = null;
    localStorage.removeItem(UserStore.tokenStorageKey);
  };
}
