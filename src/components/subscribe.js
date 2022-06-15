import React, { useState, useEffect } from 'react'
import { Mail } from 'react-feather'

const Subscribe = () => {
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('subscribe')) {
      setSubscribed(true)
    }
  }, [])

  function updateSubscribed() {
    localStorage.setItem('subscribe', 'true')
    return true
  }

  return (
    <>
      {subscribed ? (
        <p></p>
      ) : (
        <div className="mb-8">
          <h2 className="mb-4 mt-2 border-b border-base-300 pb-2 lg:text-lg font-semibold">
            Subscribe to our blog
          </h2>
          <form
            id="subscribe"
            name="subscribe"
            method="POST"
            netlify-honeypot="bot-field"
            data-netlify="true"
            onSubmit={updateSubscribed}
          >
            <label hidden>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
            <label htmlFor="subscribe-email">Email address:</label>
            <input
              className="block w-full mt-1 rounded border-2 border-base-400 px-3 py-2 bg-base-100 dark:border-base-500 hover:ring-2 focus:outline-none focus:ring-2"
              type="email"
              id="subscribe-email"
              name="email"
              placeholder="email@address.com"
              required
            />
            <button
              className="flex flex-row items-center mt-3 rounded border-2 border-secondary-400 px-3 py-2 bg-secondary-200 text-secondary-800 text-left hover:text-secondary-900 hover:border-secondary-500 focus:ring-2 focus:ring-secondary-500"
              type="submit"
            >
              <Mail className="mr-2 h-6 w-6  text-base-current" />
              Subscribe me
            </button>
            <input type="hidden" name="form-name" value="subscribe" />
          </form>
        </div>
      )}
    </>
  )
}

export default Subscribe
