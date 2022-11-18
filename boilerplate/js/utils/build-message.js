/**
 * Build an error message string
 *
 * @param {string} message The message you want to send
 * @param {number} httpStatus HTTP Stauts Code
 * @param {object} options Options
 * @param {string} options.icon Any Emoji icon
 * @returns {string} Message
 */

export const buildHttpErrorMessage = (message, httpStatus = 400, options = {}) => {
  const config = { icon: '🚨', ...options }

  return [config.icon, `[HTTP ${httpStatus}]`, message].join(' ')
}
