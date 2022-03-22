import {MessengerReducerType, MessengerActionType} from './messenger_type'

const initialState: MessengerReducerType = {
  message: null,
  messageList: [],
}

const messengerReducer = (state: MessengerReducerType = initialState, action: MessengerActionType): MessengerReducerType => {
  const {type, message} = action
  switch (type) {
    case 'NEW_MESSAGE':
      return {
        ...state,
        message,
        messageList: [message!, ...state.messageList],
      }
    case 'HIDE_MESSAGE':
      return {
        ...state,
        message: null,
      }
    default:
      return state
  }
}

export default messengerReducer
