import { getMessages } from '../../mock-server'
import React, { Component } from 'react'

class MessageBoard extends Component {
  constructor() {
    super()
    this.getMessages = this.getMessages.bind(this)
    this.storeMessages = this.storeMessages.bind(this)

    this.state = {
      originalMessageIds: [],
      messagesById: {},
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
    return (
      <h3>
        {'Message Board'}
      </h3>
    )
  }
}

export default MessageBoard
