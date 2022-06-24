import React from 'react'
import { DateTime } from 'luxon'

const TimeIntervalString = ({ date, language, timezone, start, end }) => {
  const start_time = DateTime.fromISO(date + 'T' + start, {
    zone: timezone,
  }).setLocale(language)
  console.log('start.isValid =', start_time.isValid)
  const end_time = DateTime.fromISO(date + 'T' + end, {
    zone: timezone,
  }).setLocale(language)

  if (!start_time.isValid || !end_time.isValid) {
    return <></>
  }

  return (
    <>
      {start_time.toFormat('t')}–{end_time.toFormat('t')} {end_time.offsetNameShort}
    </>
  )
}

export default TimeIntervalString
