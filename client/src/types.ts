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
  game_player1_id: number;
  game_player2_id: number;
  game_status: boolean;
  game_winner_id: number;
  game_looser_id: number;
  game_tie: boolean;
  game_start_time: Date;
  game_end_time: Date;
}
//!

export interface IGameStats {
  total: number;
  wins: number;
  losses: number;
  draws: number;
  totalDuration: number;
}

export interface IProfileState {
  profileOwner: IUserRedux;
  userGames: IGame[];
  userStats: IGameStats;
  isLoading: boolean;
  error: string | null | undefined;
}
