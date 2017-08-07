/**
 * The number of original messages that are the start of "threads" that may
 * include zero, one, or more responses.
 *
 * Set this to null for a random amount.
 *
 * For example, setting this to 8 will give you 8 original threads.
 */
export const NUMBER_OF_ORIGINAL_MESSAGES = null

/**
 * The number of responses. These may be responses to the original messages as
 * well as responses to responses. The parent of a response will be picked at
 * random.
 *
 * Set this to null for a random amount.
 *
 * For example, setting this to 80 will give you 80 responses.
 */
export const NUMBER_OF_RESPONSES = null

/**
 * The percent change when GET-ing messages will return a status 500 error.
 *
 * For example, setting this to 50 will give you 50% chance of error. Use this
 * to test error handling. 100 means that an error will always be returned.
 */
export const PERCENT_CHANCE_OF_ERROR_GET_MESSAGES = 50

/**
 * The percent change when POST-ing a message will return a status 500 error.
 *
 * For example, setting this to 50 will give you 50% chance of error. Use this
 * to test error handling. 100 means that an error will always be returned.
 */
export const PERCENT_CHANCE_OF_ERROR_POST_MESSAGE = 50
