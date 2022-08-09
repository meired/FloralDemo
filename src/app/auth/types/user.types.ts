export interface UserLogin {
  userName: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  fullName?: string;
}

export interface UserInfo {
  fullName: string;
  username: string;
  token?: string;
  passwordHash: string;
  passwordSalt: string;
}
