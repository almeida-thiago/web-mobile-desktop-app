import React, {Fragment, ReactElement, useState} from 'react'
import messenger from '../../../adapters/messenger/messenger'
import {MessageType} from '../../../entities/message'

const Alert = (): ReactElement => {
  const [message, setMessage] = useState<MessageType | null>(null)
  const [messageList, setMessageList] = useState<MessageType[]>([])

  messenger.onNewMessenger(({message: newMessage, messageList: newMessageList}) => {
    setMessage(newMessage)
    setMessageList(newMessageList)
  })

  return (
    <Fragment>
      {message && <h6>{message.text}</h6>}
      <ul>
        {messageList.map((messageItem: MessageType, index: number) => (
          <li key={index}>{messageItem.text}</li>
        ))}
      </ul>
    </Fragment>
  )
}

export default Alert
