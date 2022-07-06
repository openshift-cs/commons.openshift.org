import React from 'react'
import Speaker from './speaker'
import { DateTime } from 'luxon'
import TimeString from './time-string'

const timeFmt = 'H:mm'

const Schedule = ({ track, schedule, date, language, timezone }) => {
  return (
    <dl className="divide-y divide-secondary-400">
      {schedule
        .sort((a, b) => {
          let t1 = DateTime.fromFormat(a.local_time, timeFmt)
          let t2 = DateTime.fromFormat(b.local_time, timeFmt)
          return t1['ts'] > t2['ts'] ? 1 : -1
        })
        .filter((event) => event.track === null || event.track === track)
        .map((event) => (
          <div
            key={`${track}-${event.session_name}`}
            className="flex flex-row divide-x divide-secondary-400"
          >
            <dt className="shrink-0 self-center w-[12ch] p-4 tabular-nums text-center font-bold">
              <TimeString
                date={date}
                language={language}
                timezone={timezone}
                time={event.local_time}
              />
            </dt>
            <dd className="p-4">
              <span className="font-headings font-bold md:text-lg">{event.session_name} </span>
              <span className="block divide-x divide-primary-700">
                {event?.speakers?.map((speaker) => (
                  <Speaker
                    key={speaker.id}
                    id={speaker.id}
                    link="true"
                    className="px-2 first:pl-0"
                  />
                ))}
              </span>
            </dd>
          </div>
        ))}
    </dl>
  )
}

export default Schedule
