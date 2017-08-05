import MessageBoard from './container/message-board'
import React from 'react'

function App() {
  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px' }}>
      <h1 className="title is-1">
        {'Pets with Hats'}
      </h1>

      <MessageBoard />
    </div>
  )
}

export default App
