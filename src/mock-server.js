import faker from 'faker'

const messages = []

/**
 * Mock error
 *
 * @return {Boolean}
 */
function checkIfError() {
  return faker.random.number(5) > 1
}

function generateMessages() {
  const originalMessageCount = faker.random.number({ min: 12, max: 24 }) - 1
  const timestamps = {}
  const totalMessageCount =
    faker.random.number({ min: originalMessageCount, max: 480 }) - 1

  // generate original messages
  for (let i = 0; i < originalMessageCount; i++) {
    const timestamp = Date.parse(faker.date.past(2, '2017-08-04'))

    messages.push({
      id: i,
      message: faker.hacker.phrase(),
      timestamp,
    })

    timestamps[i] = timestamp
  }

  // generate responses
  const toBeVisited = messages.slice()

  while (toBeVisited.length > 0) {
    const parentMessage = toBeVisited.shift()
    const reponseCount =
      faker.random.number(totalMessageCount - messages.length) /
      toBeVisited.length

    for (let i = 0; i < reponseCount; i++) {
      const timestamp = Date.parse(
        faker.date.between(new Date(parentMessage.timestamp), new Date()),
      )

      const message = {
        id: messages.length - 1,
        message: faker.hacker.phrase(),
        parent: parentMessage.id,
        timestamp,
      }

      messages.push(message)

      toBeVisited.push(message)
    }
  }
}

/**
 * @return {Number} milliseconds
 */
function mockAsyncTime() {
  return faker.random.number({ min: 1200, max: 3600 })
}

generateMessages()

/**
 * Mock GET
 *
 * @param {Function} callback
 * @return {Object[]}
 */
export function getMessages(callback) {
  setTimeout(function() {
    const response = checkIfError() ? messages : { status: 500 }
    callback(response)
  }, mockAsyncTime())
}

/**
 * POST mock
 *
 * @param {Object} message
 * @param {String} message.message
 * @param {Number} message.parent
 * @param {Object} callback
 * @return {Object} message
 */
export function postMessage(message, callback) {
  setTimeout(function() {
    if (checkIfError()) {
      callback({ status: 500 })
      return
    }

    const newMessage = {
      ...message,
      id: messages.length,
      timestamp: Date.parse(new Date()),
    }

    messages.push(newMessage)
    callback(newMessage)
  }, mockAsyncTime())
}
