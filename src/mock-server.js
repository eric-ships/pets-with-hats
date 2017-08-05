import faker from 'faker'

const messages = []

function generateMessages() {
  const originalMessageCount = faker.random.number({ min: 1, max: 200 }) - 1
  const timestamps = {}
  const totalMessageCount =
    faker.random.number({ min: originalMessageCount, max: 1000 }) - 1

  for (let i = 0; i <= originalMessageCount; i++) {
    const timestamp = Date.parse(faker.date.past(2, '2017-08-05'))

    messages.push({
      id: i,
      message: faker.hacker.phrase(),
      timestamp,
    })

    timestamps[i] = timestamp
  }

  for (let i = originalMessageCount; i <= totalMessageCount; i++) {
    const parent = faker.random.number(totalMessageCount - 1)
    const timestamp = Date.parse(faker.date.future(1, Date(timestamps[parent])))

    messages.push({
      id: i,
      message: faker.hacker.phrase(),
      parent,
      timestamp,
    })
  }
}

generateMessages()

/**
 * Mock GET
 * @param {Function} callback
 * @return {Object[]}
 */
export function getMessages(callback) {
  setTimeout(function() {
    callback(messages)
  }, 500)
}

/**
 * POST mock
 * @param {Object} message
 */
export function postMessage() {
  // TODO
}
