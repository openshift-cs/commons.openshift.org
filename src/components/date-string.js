import React from 'react'
import { DateTime } from 'luxon'

const DateString = ({ date, language, dow = false, struct = false }) => {
  const dateOptions = dow
    ? {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }

  const d = DateTime.fromISO(date + 'T00:00', {
    zone: 'America/New_York',
  }).setLocale(language)

  if (struct) {
    return {
      dow: d.toFormat('cccc'),
      day: d.toFormat('d'),
      month: d.toFormat('LLLL'),
      year: d.toFormat('y'),
    }
  }

  return <>{d.toLocaleString(dateOptions)}</>
}

export default DateString
