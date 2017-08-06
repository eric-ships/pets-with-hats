import Messages from '../container/messages'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  messagesById: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      responses: PropTypes.arrayOf(PropTypes.object),
      timestamp: PropTypes.number.isRequired,
    }),
  }).isRequired,
  postMessage: PropTypes.func.isRequired,
}

function MessageList({ ids, messagesById, postMessage }) {
  /**
   * @param {Object} msg1
   * @param {Object} msg2
   * @return {Number} [-1, 0, 1]
   */
  function sortMessagesByRecency(msg1, msg2) {
    if (new Date(msg1.timestamp) < new Date(msg2.timestamp)) return 1
    if (new Date(msg1.timestamp) > new Date(msg2.timestamp)) return -1
    return 0
  }

  const messages = ids.map(id => messagesById[id]).sort(sortMessagesByRecency)

  return (
    <ul className="messages-list" style={{ margin: '1rem 0 0 0' }}>
      {messages.map(message => {
        const { id, message: text, responses, timestamp } = message

        return (
          <li className="message is-dark is-small" key={`message-${id}`}>
            <div className="message-body">
              <p className="has-text-black">
                {text}
              </p>

              <p className="has-text-grey" style={{ fontSize: '0.625rem' }}>
                {moment(timestamp).fromNow()}
              </p>

              <div>
                <Messages
                  ids={responses}
                  key={`messages-${id}`}
                  messagesById={messagesById}
                  parent={id}
                  postMessage={postMessage}
                />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

MessageList.propTypes = propTypes

export default MessageList
