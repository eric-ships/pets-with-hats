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
}

function MessageList({ ids, messagesById }) {
  const messages = ids.map(id => messagesById[id]).sort(function(m1, m2) {
    return Date(m1.timestamp) < Date(m2.timestamp)
  })

  return (
    <ul className="messages">
      {messages.map(message => {
        const { id, message: text, responses, timestamp } = message // eslint-disable-line

        return (
          <li key={id}>
            <div>
              {text}
            </div>

            <div>
              {Date(timestamp)}
            </div>

            <div>
              {id}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

MessageList.propTypes = propTypes

export default MessageList
