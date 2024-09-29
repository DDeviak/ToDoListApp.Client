export default interface User {
  id: string;
  userName: string;
  email: string;
}

export interface UserRegister {
  userName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserAuthenticationResponse {
  token: string;
  user: User;
}
