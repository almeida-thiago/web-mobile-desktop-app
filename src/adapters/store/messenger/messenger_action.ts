import {MessageType} from '../../../entities/message'
import {MessengerActionType} from './messenger_type'

export interface MessengerActionsType {
  newMessage: (message: MessageType) => MessengerActionType
  removeMessage: () => MessengerActionType
}

const newMessage = (message: MessageType): MessengerActionType => ({
  type: 'NEW_MESSAGE',
  message,
})

const removeMessage = (): MessengerActionType => ({
  type: 'HIDE_MESSAGE',
  message: null,
})

const messenger: MessengerActionsType = {newMessage, removeMessage}

export default messenger
