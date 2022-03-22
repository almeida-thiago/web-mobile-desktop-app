import {UserType} from '../../../entities/user'

export interface AuthenticationReducerType {
  user: UserType | null
}

export interface AuthenticationActionType {
  type: string
  user: UserType | null
}
