import MessageList from '../presentational/message-list'
import { postMessage } from '../../mock-server'
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
    this.focusReplyInput = this.focusReplyInput.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.setReply = this.setReply.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this)

    this.replyInput = null

    this.state = {
      isReplying: false,
      isVisible: props.areOriginalMessageIds,
      reply: '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isReplying && this.state.isReplying) {
      this.replyInput.focus()
    }
  }

  focusReplyInput() {
    if (this.state.isVisible) {
      this.replyInput.focus()
      return
    }

    this.setState({
      isReplying: true,
      isVisible: true,
    })
  }

  postMessage(event) {
    event.preventDefault()

    postMessage(
      {
        message: this.state.reply.trim(),
        parent: 0,
      },
      function(message) {
        console.log(message)
      },
    )
  }

  setReply(event) {
    this.setState({ reply: event.target.value })
  }

  toggleVisibility() {
    this.setState({
      isReplying: false,
      isVisible: !this.state.isVisible,
    })
  }

  render() {
    const { areOriginalMessageIds, ids, messagesById } = this.props
    const { isReplying, isVisible, reply } = this.state
    const isEmpty = ids.length === 0
    const isReplyable = isVisible || isReplying

    return (
      <div className="messages">
        {!areOriginalMessageIds &&
          <div className="is-clearfix">
            <button
              className="button is-outlined is-small is-pulled-right is-primary"
              onClick={this.focusReplyInput}
            >
              {'Reply'}
            </button>

            <button
              className={`button is-outlined is-small is-pulled-right ${isEmpty
                ? ''
                : 'is-info'}`}
              disabled={isEmpty}
              onClick={this.toggleVisibility}
              style={{ marginRight: '0.25rem' }}
            >
              {`${isVisible ? 'Hide' : 'Show'} responses (${ids.length})`}
            </button>
          </div>}

        {isVisible && <MessageList ids={ids} messagesById={messagesById} />}

        {isReplyable &&
          <form onSubmit={this.postMessage}>
            <input
              className="input is-small"
              onChange={this.setReply}
              placeholder="Reply..."
              ref={n => (this.replyInput = n)}
              style={{ marginTop: '1rem' }}
              type="text"
              value={reply}
            />

            <div className="is-clearfix">
              <button
                className="button is-primary is-small is-pulled-right"
                disabled={reply.trim().length === 0}
                style={{ marginTop: '0.5rem' }}
                type="submit"
              >
                {'Submit reply'}
              </button>
            </div>
          </form>}
      </div>
    )
  }
}

Messages.propTypes = propTypes
Messages.defaultProps = defaultProps

export default Messages
