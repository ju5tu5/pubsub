'use strict'

function publishSubscribePattern () {
  const subscriptions = {}

  function publish (eventName, data) {
    if (!Array.isArray(subscriptions[eventName])) {
      return
    }
    subscriptions[eventName].forEach((callback) => { callback(data) })
  }

  function subscribe (eventName, callback) {
    if (!Array.isArray(subscriptions[eventName])) {
      subscriptions[eventName] = []
    }
    subscriptions[eventName].push(callback)

    return function unsubscribe () {
      subscriptions[eventName].splice(subscriptions[eventName].length - 1, 1)
    }
  }

  return {
    publish,
    subscribe
  }
}

function messageHandler (message) {
  console.log('> ', message)
}

const zendmast = publishSubscribePattern()
const unsubscribe = zendmast.subscribe('message', messageHandler)
