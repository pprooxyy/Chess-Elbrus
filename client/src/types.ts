//* StartPage(+LoginModal, RegisterModal)

export interface IRegisterForm {
  user_name: string;
  user_email: string;
  user_password: string;
}

export interface ILoginForm {
  user_email: string;
  user_password: string;
}

//* Redux

export interface IUserRedux {
  id: number;
  user_name: string;
  user_rating: number;
  user_avatar: string;
}

export interface IAuthState {
  user: IUserRedux;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null | undefined;
  msg: string;
}

export interface ILoginState {
  user: ILoginForm;
  isAuthenticated: boolean;
  isLoading: boolean;
}
