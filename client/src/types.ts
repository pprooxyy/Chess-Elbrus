//todo StartPage(+LoginModal, RegisterModal)

export interface IRegisterForm {
  user_name: string;
  user_email: string;
  user_password: string;
}

export interface ILoginForm {
  user_email: string;
  user_password: string;
}

//todo ProfilePage

export type EditNameFormProps = {
  setEditName: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface IEditNameForm {
  user_name: string;
}

//todo Redux

//? authSlicer

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

//? profileSlicer
//! l-OO-ser ?!
export interface IGame {
  id: number;
  user_name: string;
  total: number;
  wins: number;
  losses: number;
  draws: number;
  user_rating: number;
}
//!

export interface IGameStats {
  total: number;
  wins: number;
  losses: number;
  draws: number;
  totalDuration: number;
}

export interface IUserFriend {
  id: number;
  user_name: string;
  user_rating: number;
  user_avatar: string;
}

export interface IProfileState {
  profileOwner: IUserRedux;
  userGames: IGame[];
  userFriends: IUserFriend[];
  userStats: IGameStats;
  isLoading: boolean;
  error: string | null | undefined;
}

//? Leaders Slicer

export interface ILeaderState {
  games: IGame[];
  isLoading: boolean;
  error: string | null;
}
