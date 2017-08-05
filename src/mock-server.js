import faker from 'faker';

const messages = []

function generateMessages() {
  const originalMessageCount = faker.random.number({ min: 1, max: 200 }) - 1
  const totalMessageCount = faker.random.number({ min: originalMessageCount, max: 1000 }) - 1

  for (let i = 0; i <= originalMessageCount; i++) {
    messages.push({
      id: i,
      message: faker.hacker.phrase(),
      timestamp: Date.parse(faker.date.past()),
    })
  }

  for (let i = originalMessageCount; i <= totalMessageCount; i++) {
    messages.push({
      id: i,
      message: faker.hacker.phrase(),
      parent: faker.random.number(originalMessageCount - 1),
      timestamp: Date.parse(faker.date.past()),
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
  }, 500);
};

/**
 * POST mock
 * @param {Object} message
 */
export function postMessage(message) {
  // TODO
}
