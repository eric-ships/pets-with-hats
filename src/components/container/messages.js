import MessageList from '../presentational/message-list'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const propTypes = {
  areOriginalMessageIds: PropTypes.bool,
  ids: PropTypes.arrayOf(PropTypes.number),
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
  ids: [],
  areOriginalMessageIds: false,
}

class Messages extends Component {
  constructor(props) {
    super(props)
    this.toggleVisibility = this.toggleVisibility.bind(this)

    this.state = {
      isVisible: props.areOriginalMessageIds,
    }
  }

  toggleVisibility() {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  render() {
    const { areOriginalMessageIds, ids, messagesById } = this.props
    const { isVisible } = this.state
    const isEmpty = ids.length === 0

    return (
      <div className="messages">
        {!areOriginalMessageIds &&
          <button
            className={`button is-outlined is-small ${isEmpty
              ? ''
              : 'is-info'}`}
            disabled={isEmpty}
            onClick={this.toggleVisibility}
          >
            {`${isVisible ? 'hide' : 'show'} responses (${ids.length})`}
          </button>}

        {isVisible && <MessageList ids={ids} messagesById={messagesById} />}
      </div>
    )
  }
}

Messages.propTypes = propTypes
Messages.defaultProps = defaultProps

export default Messages
