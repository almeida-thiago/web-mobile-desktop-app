import {combineReducers, createStore, Store, Reducer, CombinedState} from 'redux'
import messengerReducer from './messenger/messenger_reducer'
import authenticationReducer from './authentication/authentication_reducer'
import {MessengerActionType, MessengerReducerType} from './messenger/messenger_type'
import {AuthenticationActionType, AuthenticationReducerType} from './authentication/authentication_type'

export interface StoreType {
  messengerState: MessengerReducerType
  authState: AuthenticationReducerType
}

const reducers: Reducer<CombinedState<StoreType>, MessengerActionType | AuthenticationActionType> = combineReducers({
  messengerState: messengerReducer,
  authState: authenticationReducer,
})

const store: Store<StoreType, MessengerActionType | AuthenticationActionType> = createStore(reducers)

export default store
