import faker from 'faker'

const messages = []

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

generateMessages()

/**
 * Mock GET
 *
 * @param {Function} callback
 * @return {Object[]}
 */
export function getMessages(callback) {
  setTimeout(function() {
    const response =
      faker.random.number(5) > 1 // mock error
        ? messages
        : { status: 500 }

    callback(response)
  }, faker.random.number({ min: 1200, max: 3600 }))
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
    message.id = messages.length
    message.timestamp = Date.parse(new Date())
    messages.push(message)
    callback(message)
  }, faker.random.number({ min: 1200, max: 3600 }))
}
