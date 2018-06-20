import * as AuthAction from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthAction.AuthActions) {

  switch (action.type) {
    case (AuthAction.SIGNUP):
    case (AuthAction.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case (AuthAction.LOGOUT):
      return {
        ...state,
        authenticated: false,
        token: null
      };
    default:
      return state;
  }
}
