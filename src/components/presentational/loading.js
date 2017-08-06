import React from 'react'

function Loading() {
  // Hacking Bulma for loading indicator
  return (
    <div className="has-text-centered">
      <div
        className="button is-large is-loading"
        style={{ border: 'none', marginTop: '1.5rem' }}
      >
        {'Loading...'}
      </div>
    </div>
  )
}

export default Loading
