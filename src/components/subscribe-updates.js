import React from 'react'
import { Mail } from 'react-feather'

const formStyles =
  'flex w-full mt-1 text-base-100 dark:text-base-900 placeholder-base-300 dark:placeholder-base-500 rounded border-2 border-base-400 px-3 py-2 bg-base-600 dark:bg-secondary-200 dark:border-base-500 hover:ring-2 focus:outline-none focus:ring-2'

const SubscribeUpdates = () => {
  function updateSubscribed() {
    return true
  }

  return (
    <div className="mb-8 w-full">
      <h2 className="mb-8 pb-2 md:pb-4 mt-2 border-base-500 text-base-400 dark:text-secondary-600 font-bold border-b text-lg md:text-2xl lg:text-3xl ">
        Sign up to stay informed
      </h2>
      <form
        id="subscribeUpdates"
        name="subscribeUpdates"
        method="POST"
        className="space-y-6 w-full"
        netlify-honeypot="bot-field"
        data-netlify="true"
        onSubmit={updateSubscribed}
      >
        <label hidden>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
        <div className="flex w-full flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-full">
            <label htmlFor="subscribe-first-name">First name:</label>
            <input
              className={formStyles}
              type="text"
              id="subscribe-first-name"
              name="first-name"
              placeholder="First"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="subscribe-last-name">Last name:</label>
            <input
              className={formStyles}
              type="text"
              id="subscribe-last-name"
              name="last-name"
              placeholder="Last"
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="subscribe-email">Email address:</label>
          <input
            className={formStyles}
            type="email"
            id="subscribe-email"
            name="email"
            placeholder="email@address.com"
            required
          />
        </div>
        <div>
          <button
            className="light mt-8 flex flex-row items-center bg-tertiary-400 font-semibold text-tertiary-900 rounded text-xl px-4 py-3 text-left hover:text-tertiary-800 hover:bg-tertiary-300 focus:ring-2 focus:ring-secondary-500"
            type="submit"
          >
            <Mail className="mr-2 h-6 w-6 text-base-current" />
            Stay up to date
          </button>
        </div>
        <input type="hidden" name="form-name" value="subscribeUpdates" />
      </form>
    </div>
  )
}

export default SubscribeUpdates
