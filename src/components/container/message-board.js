import Loading from '../presentational/loading'
import Messages from './messages'
import Refetch from './refetch'
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
      isGettingMessages: true,
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
    getMessages(response => {
      if (response.status === 500) {
        this.setState({
          hasError: true,
          isGettingMessages: false,
        })
      } else {
        this.storeMessages(response)
      }
    })

    this.setState({
      hasError: false,
      isGettingMessages: true,
    })
  }

  /**
   * @param {Object} message
   * @param {String} message.message
   * @param {Number} message.parent
   */
  postMessage(message) {
    postMessage(message, response => {
      if (response.status === 500) {
        this.postMessage(message)
      } else {
        this.addMessage(response)
      }
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
      isGettingMessages: false,
      messagesById,
      originalMessageIds,
    })
  }

  render() {
    const {
      hasError,
      isGettingMessages,
      messagesById,
      originalMessageIds,
    } = this.state

    if (isGettingMessages) {
      return <Loading />
    }

    if (hasError) {
      return <Refetch callback={this.getMessages} />
    }

    return (
      <div>
        <h5 className="subtitle is-5">
          {'Message Board'}
        </h5>

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
