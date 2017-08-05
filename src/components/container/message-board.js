import { getMessages } from '../../mock-server'
import Messages from '../container/messages'
import React, { Component } from 'react'

class MessageBoard extends Component {
  constructor() {
    super()
    this.getMessages = this.getMessages.bind(this)
    this.storeMessages = this.storeMessages.bind(this)

    this.state = {
      messagesById: {},
      originalMessageIds: [],
    }
  }

  componentDidMount() {
    this.getMessages()
  }

  getMessages() {
    getMessages(messages => {
      this.storeMessages(messages)
    })
  }

  /**
   * @param {Object[]} messages
   */
  storeMessages(messages) {
    const { messagesById, originalMessageIds } = this.state

    messages.forEach(function(message) {
      const { id, parent } = message

      if (parent === undefined) {
        originalMessageIds.push(id)
      } else {
        const { responses = [] } = messagesById[parent] || {}

        responses.push(id)

        messagesById[parent] = {
          ...messagesById[parent],
          responses,
        }
      }

      messagesById[id] = message
    })

    this.setState({
      messagesById,
      originalMessageIds,
    })
  }

  render() {
    const { messagesById, originalMessageIds } = this.state

    return (
      <div>
        <h3>
          {'Message Board'}
        </h3>

        <Messages
          ids={originalMessageIds}
          isVisible
          messagesById={messagesById}
        />
      </div>
    )
  }
}

export default MessageBoard
