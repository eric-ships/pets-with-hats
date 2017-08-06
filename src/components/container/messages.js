import MessageList from '../presentational/message-list'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number),
  messagesById: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      responses: PropTypes.arrayOf(PropTypes.object),
      timestamp: PropTypes.number.isRequired,
    }),
  }).isRequired,
  parent: PropTypes.number,
  postMessage: PropTypes.func.isRequired,
}

const defaultProps = {
  ids: [],
  parent: null,
}

class Messages extends Component {
  constructor(props) {
    super(props)
    this.focusReplyInput = this.focusReplyInput.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.setReply = this.setReply.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this)

    this.replyInput = null

    /**
      * Because ids is not immutuable, keeping count here to check when new
      * message has come in from postMessage.
      */
    this.idsLength = props.ids.length

    this.state = {
      isReplying: false,
      isPostingReply: false,
      isVisible: props.parent === null,
      reply: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isPostingReply && nextProps.ids.length > this.idsLength) {
      this.idsLength = nextProps.ids.length

      this.setState({
        isPostingReply: false,
        reply: '',
      })
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

    this.props.postMessage({
      message: this.state.reply.trim(),
      parent: this.props.parent,
    })

    this.setState({ isPostingReply: true })
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
    const { parent, ids, messagesById } = this.props
    const { isPostingReply, isVisible, reply } = this.state
    const isEmpty = ids.length === 0
    const isReplyable = isVisible && parent !== null

    return (
      <div className="messages">
        {parent !== null &&
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

        {isReplyable &&
          <form onSubmit={this.postMessage}>
            <input
              className="input is-small"
              disabled={isPostingReply}
              onChange={this.setReply}
              placeholder="Reply..."
              ref={n => (this.replyInput = n)}
              style={{ marginTop: '1rem' }}
              type="text"
              value={reply}
            />

            <div className="is-clearfix">
              <button
                className={`button is-primary is-small is-pulled-right ${isPostingReply
                  ? 'is-loading'
                  : ''}`}
                disabled={isPostingReply || reply.trim().length === 0}
                style={{ marginTop: '0.5rem' }}
                type="submit"
              >
                {'Submit reply'}
              </button>
            </div>
          </form>}

        {isVisible &&
          <MessageList
            ids={ids}
            key={`message-list-${parent ? parent : 'parent'}`}
            messagesById={messagesById}
            postMessage={this.props.postMessage}
          />}
      </div>
    )
  }
}

Messages.propTypes = propTypes
Messages.defaultProps = defaultProps

export default Messages
