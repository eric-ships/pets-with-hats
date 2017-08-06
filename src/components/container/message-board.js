import Messages from '../container/messages'
import { getMessages, postMessage } from '../../mock-server'
import React, { Component } from 'react'

class MessageBoard extends Component {
  constructor() {
    super()
    this.addMessage = this.addMessage.bind(this)
    this.getMessages = this.getMessages.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.storeMessages = this.storeMessages.bind(this)

    this.state = {
      messagesById: {},
      originalMessageIds: [],
    }
  }

  componentDidMount() {
    this.getMessages()
  }

  /**
   * @param {Object} message
   * @param {Number} message.id
   * @param {String} message.message
   * @param {Number} message.parent
   * @param {String} message.timestamp
   */
  addMessage(message) {
    const { messagesById } = this.state
    const { id, parent } = message

    messagesById[id] = message

    const parentMessage = messagesById[parent] || {}
    const { responses = [] } = parentMessage

    responses.push(id)

    messagesById[parent] = {
      ...parentMessage,
      responses,
    }

    this.setState({ messagesById })
  }

  getMessages() {
    getMessages(messages => {
      this.storeMessages(messages)
    })
  }

  /**
   * @param {Object} message
   * @param {String} message.message
   * @param {Number} message.parent
   */
  postMessage(message) {
    postMessage(message, response => {
      this.addMessage(response)
    })
  }

  /**
   * @param {Object[]} messages
   */
  storeMessages(messages) {
    const { messagesById, originalMessageIds } = this.state

    messages.forEach(function(message) {
      const { id, parent } = message
      const { responses = [] } = messagesById[id] || {}

      if (parent === undefined) {
        originalMessageIds.push(id)
      } else {
        const parentMessage = messagesById[parent] || {}
        const { responses: parentResponses = [] } = parentMessage

        parentResponses.push(id)

        messagesById[parent] = {
          ...parentMessage,
          responses: parentResponses,
        }
      }

      messagesById[id] = {
        ...message,
        responses,
      }
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
        <h3 className="subtitle is-3">
          {'Message Board'}
        </h3>

        <Messages
          ids={originalMessageIds}
          messagesById={messagesById}
          postMessage={this.postMessage}
        />
      </div>
    )
  }
}

export default MessageBoard
