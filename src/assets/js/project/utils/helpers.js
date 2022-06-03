/**
 * Check if two objects or arrays are equal
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}       Returns true if they're equal in value
 */
export function isEqual (obj1, obj2) {
  /**
   * More accurately check the type of a JavaScript object
   * @param  {Object} obj The object
   * @return {String}     The object type
   */
  function getType (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  }

  function areArraysEqual () {
    // Check length
    if (obj1.length !== obj2.length) return false

    // Check each item in the array
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false
    }

    // If no errors, return true
    return true
  }

  function areObjectsEqual () {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

    // Check each item in the object
    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!isEqual(obj1[key], obj2[key])) return false
      }
    }

    // If no errors, return true
    return true
  }

  function areFunctionsEqual () {
    return obj1.toString() === obj2.toString()
  }

  function arePrimativesEqual () {
    return obj1 === obj2
  }

  // Get the object type
  const type = getType(obj1)

  // If the two items are not the same type, return false
  if (type !== getType(obj2)) return false

  // Compare based on type
  if (type === 'array') return areArraysEqual()
  if (type === 'object') return areObjectsEqual()
  if (type === 'function') return areFunctionsEqual()
  return arePrimativesEqual()
}

/**
 * Debounce functions for better performance
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} fn The function to debounce
 */
export function debounce (fn) {
  // Setup a timer
  let timeout

  // Return a function to run debounced
  return function () {
    // Setup the arguments
    const context = this
    const args = arguments

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout)
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
      fn.apply(context, args)
    })
  }
}

/**
 * Emit a custom event
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} type   The event type
 * @param  {Object} detail Any details to pass along with the event
 * @param  {Node}   elem   The element to attach the event to
 */
export function emitEvent (type, detail = {}, elem = document) {
  // Make sure there's an event type
  if (!type) return

  // Create a new event
  const event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail
  })

  // Dispatch the event
  return elem.dispatchEvent(event)
}

/**
 * Converts metric measurement to scale.
 *
 * @param {number} length The measurement to scale.
 * @param {string} unit The unit to use. Default meters.
 * @returns {number} The scaled measurement.
 */
export function convertMetricToScale (length, unit = 'm') {
  switch (unit) {
    case 'm':
      return length
    case 'mm':
      return length / 100
    case 'km':
      return length * 1000
  }
}
