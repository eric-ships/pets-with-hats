import PropTypes from 'prop-types'
import React, { Component } from 'react'

const propTypes = {
  callback: PropTypes.func.isRequired,
  secondsBeforeRefetch: PropTypes.number,
}

const defaultProps = {
  secondsBeforeRefetch: 5,
}

class Refetch extends Component {
  constructor(props) {
    super(props)
    this.countDown = this.countDown.bind(this)

    this.intervalId = null

    this.state = {
      seconds: props.secondsBeforeRefetch,
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.countDown, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  countDown() {
    if (this.state.seconds > 1) {
      this.setState({ seconds: this.state.seconds - 1 })
    } else {
      clearInterval(this.intervalId)
      this.props.callback()
    }
  }

  render() {
    return (
      <div className="message is-warning is-small">
        <div className="message-body">
          <p>
            {`There seems to be connection issues.`}
          </p>

          <p>
            {` Trying again in ${this.state.seconds} ${this.state.seconds > 1 ? 'seconds' : 'second'}...`}
          </p>

          <p>
            <button
              className="button is-small is-warning"
              onClick={this.props.callback}
              style={{ marginTop: '0.5rem' }}
            >
              {'Try now'}
            </button>
          </p>
        </div>
      </div>
    )
  }
}

Refetch.propTypes = propTypes
Refetch.defaultProps = defaultProps

export default Refetch
