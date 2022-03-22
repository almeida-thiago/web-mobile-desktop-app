import {AuthenticationReducerType, AuthenticationActionType} from './authentication_type'

const initialState: AuthenticationReducerType = {
  user: null,
}

const authenticationReducer = (state: AuthenticationReducerType = initialState, action: AuthenticationActionType): AuthenticationReducerType => {
  const {type, user} = action
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user,
      }
    case 'REMOVE_USER':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export default authenticationReducer
