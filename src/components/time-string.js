import React from 'react'
import { DateTime } from 'luxon'

const TimeString = ({ date, language, timezone, time }) => {
  const dt = DateTime.fromISO(date + 'T' + time, {
    zone: timezone,
  }).setLocale(language)

  if (!dt.isValid) {
    return <></>
  }

  return <>{dt.toFormat('t')}</>
}

export default TimeString
