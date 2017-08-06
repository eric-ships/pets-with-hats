import MessageBoard from './container/message-board'
import React from 'react'

function App() {
  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px' }}>
      <h3 className="title is-3">
        {'Pets with Hats'}
      </h3>

      <MessageBoard />
    </div>
  )
}

export default App
