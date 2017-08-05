import MessageList from '../presentational/message-list'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  isVisible: PropTypes.bool,
  messagesById: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      responses: PropTypes.arrayOf(PropTypes.object),
      timestamp: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

const defaultProps = {
  isVisible: false,
}

class Messages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: props.isVisible,
    }
  }

  render() {
    const { ids, messagesById } = this.props

    if (this.state.isVisible) {
      return <MessageList ids={ids} messagesById={messagesById} />
    }

    return (
      <button>
        {`responses ${ids.length}`}
      </button>
    )
  }
}

Messages.propTypes = propTypes
Messages.defaultProps = defaultProps

export default Messages
