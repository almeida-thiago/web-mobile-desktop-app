import {UserType} from '../../../entities/user'
import {AuthenticationActionType} from './authentication_type'

export interface AuthenticationActionsType {
  setAuthUser: (user: UserType) => AuthenticationActionType
  removeAuthUser: () => AuthenticationActionType
}

const setAuthUser = (user: UserType): AuthenticationActionType => ({
  type: 'SET_USER',
  user,
})

const removeAuthUser = (): AuthenticationActionType => ({
  type: 'REMOVE_USER',
  user: null,
})

const auth: AuthenticationActionsType = {setAuthUser, removeAuthUser}

export default auth
