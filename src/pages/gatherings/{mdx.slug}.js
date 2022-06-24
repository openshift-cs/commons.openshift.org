import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Seo from '../../components/seo'
import Speaker from '../../components/speaker'
import ShareButtons from '../../components/sharebuttons'
import IconBox from '../../components/iconbox'
import DateString from '../../components/date-string'
import TimeIntervalString from '../../components/time-interval-string'
import Sponsor from '../../components/sponsor'
import { Youtube } from 'react-feather'
import * as Tabs from '@radix-ui/react-tabs'
import Schedule from '../../components/schedule'
import { DateTime } from 'luxon'
import Videos from '../../components/videos'

const today = DateTime.now().startOf('day')

export default function GatheringPage({ data, ...props }) {
  const {
    body,
    frontmatter: {
      title,
      language,
      date,
      time,
      timezone,
      start_time,
      end_time,
      description,
      location,
      schedule,
      head_text,
      lead_text,
      info_text,
      event_footer_text,
      schedule_leadin,
      videos_text,
      venue,
      venue_URL,
      venue_address,
      invite_link,
      google_maps_URL,
      price,
      registration_text,
      registration_URL,
      registration_text2,
      registration_URL2,
      registration_text3,
      registration_URL3,
      sponsoring_URL,
      sponsoring_text,
      sponsors,
      translate_overview,
      translate_schedule,
      translate_speakers,
      translate_venue,
      translate_where,
      translate_when,
      translate_price,
      translate_invite,
      translate_sponsors,
    },
  } = data.mdx
  const url = props.location.href
  const headingStyle =
    'text-center font-headings text-xl md:text-3xl lg:text-4xl text-base-800 mb-4 lg:mb-8'
  const subheadingStyle =
    'font-headings text-lg md:text-xl lg:text-2xl text-accent-600 dark:text-accent-600 my-2 md:mt-4 md:mb-2'
  const ledeStyle = 'mb-2 lg:mb-4 mt-2 text-primary-700 text-base lg:text-lg max-w-[56ch]'
  const aStyle =
    'underline text-primary-700 visited:text-primary-900 focus:ring-2 focus:ring-primary-600 hover:text-warning-700'

  let archived = false

  // If the date has past, this is a video archive page
  if (DateTime.fromISO(date).startOf('day') < today) {
    archived = true
  }

  let speakersList = schedule
    ?.filter((session) => session.speakers)
    .map((session) =>
      session?.speakers?.filter((speaker) => speaker.id).map((speaker) => speaker?.id),
    )

  // Flatten the array of arrays and just keep the unique ones.
  speakersList = Array.prototype.concat.apply([], speakersList)
  const speakerList = [...new Set(speakersList)]

  let sponsorLevels = []
  let sponsorLabels = []

  // If sponsors with levels, create array of levels.
  if (sponsors && sponsors[0].level) {
    sponsorLevels = sponsors.map((sponsor) => {
      sponsorLabels[sponsor.level] = sponsor.label
      return sponsor.level
    })

    // Just keep the unique ones.
    sponsorLevels = [...new Set(sponsorLevels)]
  }

  const tabsTriggerStyle =
    'p-4 border-primary-900 font-headings font-bold md:text-lg tab-active:bg-accent-700 tab-active:text-white dark:tab-active:bg-accent-200'

  let tracks = []

  tracks = schedule?.filter((event) => event.track !== null).map((event) => event.track)
  // Just keep the unique ones.
  tracks = [...new Set(tracks)]

  let bannerStyle =
    'light bg-primary-800 text-primary-200 flex flex-col justify-center items-center text-center min-h-[300px] md:min-h-[400px] px-4 md:px-6 py-4 md:py-0'

  if (archived) {
    bannerStyle =
      'light bg-accent-800 text-accent-200 flex flex-col justify-center items-center text-center min-h-[300px] md:min-h-[400px] px-4 md:px-6 py-4 md:py-8'
  }

  return (
    <>
      <Seo title={title} description={description} />
      <section className={bannerStyle}>
        <div className="space-y-6 max-w-[900px]">
          <h1 className="font-headings font-bold text-4xl md:text-5xl lg:text-6xl tracking-wide">
            {title}
          </h1>
          <p className="text-xl lg:text-2xl">
            <DateString date={date} language={language} /> |{' '}
            <TimeIntervalString
              date={date}
              language={language}
              timezone={timezone}
              start={start_time}
              end={end_time}
            />{' '}
            | {location}
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl page-wrapper">
        <div className="flex justify-between border-b border-base-300 py-4 text-base-500">
          <ShareButtons title={title} url={url} twitterHandle="openshiftcommon" />
        </div>

        {archived && (
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
            <Videos title={title} />
          </div>
        )}

        <section className="flex flex-col items-center my-8 md:my-12">
          {head_text ? (
            <p className={`${ledeStyle} text-center`}>{head_text}</p>
          ) : (
            <p className={`${ledeStyle} text-center`}>
              Where users, partners, customers, contributors and upstream project leads come
              together to collaborate and work together across the OpenShift Cloud Native ecosystem.
            </p>
          )}

          {archived ? (
            <p className={`${ledeStyle} text-center text-accent-600`}>The event is over</p>
          ) : (
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:gap-4">
              <IconBox title={registration_text} url={registration_URL} />
              {registration_text2 && <IconBox title={registration_text2} url={registration_URL2} />}
              {registration_text3 && <IconBox title={registration_text3} url={registration_URL3} />}
              {sponsoring_URL &&
                (sponsoring_text ? (
                  <IconBox title={sponsoring_text} url={sponsoring_URL} />
                ) : (
                  <IconBox title="Apply to be a Sponsor" url={sponsoring_URL} />
                ))}
            </div>
          )}
        </section>

        {(lead_text || info_text) && (
          <section className="my-8 md:my-16">
            <h2 className={headingStyle}>
              {translate_overview ? <>{translate_overview}</> : <>Event Overview</>}
            </h2>

            <div className="mb-4 lg:mb-8 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 shrink-0">
                <p className={`${ledeStyle}`}>{lead_text}</p>
                <p className="max-w-[56ch]">{info_text}</p>
                {!archived && (
                  <div className="mt-4 lg:mt-8 flex justify-center gap-2 md:gap-4">
                    <IconBox title={registration_text} url={registration_URL} />

                    {invite_link &&
                      (translate_invite ? (
                        <IconBox title={translate_invite} url={invite_link} />
                      ) : (
                        <IconBox title="Invite a Friend" url={invite_link} />
                      ))}
                  </div>
                )}
              </div>
              <div>
                <div className="mt-4 bg-primary-100 dark:bg-base-100 w-full rounded-2xl border-2 border-base-400 px-6 py-4">
                  <h3 className={`${subheadingStyle} md:text-center`}>
                    {translate_where ? <>{translate_where}</> : <>Where</>}
                  </h3>
                  <p
                    className={`${ledeStyle} !max-w-none md:text-center border-b-2 border-primary-200 pb-4`}
                  >
                    {location}
                    <br />
                    {venue_URL ? (
                      <a
                        className={aStyle}
                        href={venue_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {venue}
                      </a>
                    ) : (
                      <a className={aStyle} href="#gathering-venue">
                        {venue}
                      </a>
                    )}
                  </p>
                  <div className="grid grid-cols-2 gap-4 lg:gap-8">
                    <div>
                      <h3 className={subheadingStyle}>
                        {translate_when ? <>{translate_when}</> : <>When</>}
                      </h3>
                      <p className={ledeStyle}>
                        <DateString date={date} language={language} dow="true" />
                      </p>
                    </div>
                    <div>
                      <h3 className={subheadingStyle}>
                        {translate_price ? <>{translate_price}</> : <>Price</>}
                      </h3>
                      <p className={ledeStyle}>{price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className={`${ledeStyle} mx-auto text-center`}>{event_footer_text}</p>
          </section>
        )}

        {(sponsors || sponsoring_URL) && (
          <section className="my-8 md:my-16">
            <h2 className={headingStyle}>
              {translate_sponsors ? <>{translate_sponsors}</> : <>Sponsors</>}
            </h2>
            {sponsoring_URL && (
              <>
                <p className={ledeStyle}>
                  Interested in sponsoring an OpenShift Commons Gathering?
                </p>
                {sponsoring_text ? (
                  <IconBox title={sponsoring_text} url={sponsoring_URL} />
                ) : (
                  <IconBox title="Apply to be a Sponsor" url={sponsoring_URL} />
                )}
              </>
            )}

            {sponsors && (
              <>
                {sponsors[0].level ? (
                  sponsorLevels
                    .sort((a, b) => (a > b ? 1 : -1))
                    .map((lvl) => (
                      <div key={lvl}>
                        <h3 className={`${subheadingStyle} text-center`}>{sponsorLabels[lvl]}</h3>
                        <ul className="mt-4 mb-8 mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-8">
                          {sponsors
                            .filter((sponsor) => sponsor.level === lvl)
                            .map((sponsor) => (
                              <li key={sponsor.name}>
                                <Sponsor name={sponsor.name} />
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))
                ) : (
                  <ul className="mt-8 flex flex-wrap justify-center items-center gap-4 md:gap-8">
                    {sponsors.map((sponsor) => (
                      <li key={sponsor.name}>
                        <Sponsor name={sponsor.name} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        )}

        {schedule && (
          <section className="my-8 md:my-16">
            <h2 className={headingStyle}>
              {translate_schedule ? <>{translate_schedule}</> : <>Schedule</>}
            </h2>
            {schedule_leadin ? (
              <p className={`${ledeStyle} mx-auto text-center`}>{schedule_leadin}</p>
            ) : (
              <p className={`${ledeStyle} mx-auto`}>
                Code of Conduct: We follow the Code of Conduct of other events such as KubeCon.
                Similarly we are dedicated to providing a harassment-free experience for
                participants at all of our events, whether they are held in person or virtually. All
                event participants, whether they are attending an in-person event or a virtual
                event, are expected to behave in accordance with professional standards, with both
                this Code of Conduct as well as their respective employer's policies governing
                appropriate workplace behavior and applicable laws.
              </p>
            )}
            <p className="mt-8 text-center">
              {videos_text ? (
                <IconBox
                  title={videos_text}
                  url="https://www.youtube.com/user/rhopenshift/playlists?search_query=gathering"
                  icon={<Youtube alt="" />}
                />
              ) : (
                <IconBox
                  title="See sessions from previous gatherings"
                  url="https://www.youtube.com/user/rhopenshift/playlists?search_query=gathering"
                  icon={<Youtube alt="" />}
                />
              )}
            </p>

            {tracks[0] ? (
              <Tabs.Root defaultValue={encodeURIComponent(tracks[0])} className="my-8 md:my-16">
                <Tabs.List
                  aria-label="schedule of events"
                  className="overflow-hidden rounded-t-lg border-2 border-b-0 border-secondary-400 inline-flex divide-x-2 divide-secondary-400"
                >
                  {tracks.map((track) => (
                    <Tabs.Trigger
                      key={track}
                      value={encodeURIComponent(track)}
                      className={tabsTriggerStyle}
                    >
                      {track}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                {tracks.map((track) => (
                  <Tabs.Content
                    className="rounded-lg rounded-tl-none border-2 border-secondary-400"
                    key={`${track}-content`}
                    value={encodeURIComponent(track)}
                  >
                    <Schedule track={track} schedule={schedule} />
                  </Tabs.Content>
                ))}
              </Tabs.Root>
            ) : (
              <div className="my-8 md:my-16 rounded-lg border-2 border-secondary-400">
                <Schedule schedule={schedule} />
              </div>
            )}
          </section>
        )}

        {speakerList.length !== 0 && (
          <section className="my-8 md:my-16">
            <h2 className={headingStyle}>
              {translate_speakers ? <>{translate_speakers}</> : <>Speakers</>}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              {speakerList
                .sort((a, b) => (a > b ? 1 : -1))
                .map((id) => (
                  <Speaker key={id} id={id} />
                ))}
            </div>
          </section>
        )}

        {venue && (
          <section id="gathering-venue" className="my-8 md:my-16 text-center">
            <h2 className={headingStyle}>
              {translate_venue ? <>{translate_venue}</> : <>Venue</>}
            </h2>
            <p className="mb-4 font-semibold text-tertiary-900 text-lg lg:text-xl">
              <DateString date={date} language={language} /> |{' '}
              <TimeIntervalString
                date={date}
                language={language}
                timezone={timezone}
                start={start_time}
                end={end_time}
              />
            </p>

            <p className={`${ledeStyle} max-w-none text-center mx-auto`}>
              {venue_URL ? (
                <a className={aStyle} href={venue_URL} target="_blank" rel="noopener noreferrer">
                  {venue}
                </a>
              ) : (
                <>{venue}</>
              )}
              {venue_address && (
                <>
                  <br />
                  {venue_address}
                </>
              )}
              <br />
              {location}
            </p>
            {google_maps_URL && (
              <div
                className="video-embed my-8"
                dangerouslySetInnerHTML={{ __html: google_maps_URL }}
              ></div>
            )}
          </section>
        )}
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </>
  )
}

export const query = graphql`
  query GatheringBySlug($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        language
        date
        timezone
        start_time
        end_time
        title
        description
        location
        venue
        venue_URL
        venue_address
        invite_link
        google_maps_URL
        price
        registration_text
        registration_URL
        registration_text2
        registration_URL2
        registration_text3
        registration_URL3
        sponsoring_URL
        sponsoring_text
        sponsors {
          name
          label
          level
        }
        head_text
        lead_text
        info_text
        event_footer_text
        videos_text
        schedule_leadin
        schedule {
          local_time
          session_name
          track
          speakers {
            id
          }
        }
        translate_overview
        translate_schedule
        translate_speakers
        translate_venue
        translate_where
        translate_when
        translate_price
        translate_invite
        translate_sponsors
      }
    }
  }
`
