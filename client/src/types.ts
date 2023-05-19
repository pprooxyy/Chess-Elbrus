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
}

export interface IAuthState {
  user: IUserRedux;
  loading: boolean;
  error: string | null | undefined;
}

export interface ILoginState {
  user: ILoginForm;
  isAuthenticated: boolean;
  isLoading: boolean;
}
