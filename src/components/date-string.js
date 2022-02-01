import React from 'react'
import { DateTime } from 'luxon'

const DateString = ({ date, language, dow = false }) => {
  const dateOptions = dow
    ? {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        zone: 'America/Los_Angeles',
      }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        zone: 'America/Los_Angeles',
      }

  const d = DateTime.fromISO(date + 'T00:00', {
    zone: 'America/Los_Angeles',
  })

  return <span>{d.setLocale(language).toLocaleString(dateOptions)}</span>
}

export default DateString
