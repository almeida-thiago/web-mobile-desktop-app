import store from '../store/store'
import {MessengerReducerType} from '../store/messenger/messenger_type'

export interface MessengerType {
  onNewMessenger(callback: (message: MessengerReducerType) => void): void
}

const onNewMessenger = (callback: (message: MessengerReducerType) => void): void => {
  store.subscribe(() => {
    const {messengerState} = store.getState()
    if (messengerState.message) {
      callback(messengerState)
    }
  })
}

const messenger: MessengerType = {onNewMessenger}

export default messenger
