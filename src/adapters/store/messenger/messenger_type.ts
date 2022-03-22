import {MessageType} from '../../../entities/message'

export interface MessengerReducerType {
  message: MessageType | null
  messageList: MessageType[]
}

export interface MessengerActionType {
  type: string
  message: MessageType | null
}
