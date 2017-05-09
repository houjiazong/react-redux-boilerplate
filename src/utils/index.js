const navigator = global.navigator && global.navigator.userAgent

export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1
