import React from 'react'

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import { Facebook, Linkedin, Twitter } from 'react-feather'

const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  const buttonClass =
    'rounded focus:ring-2 focus:ring-base-500 focus:ring-inset'
  const iconClass =
    'inline h-7 w-7 mx-0.5 p-1 rounded leading-none fill-current hover:bg-base-500 hover:text-base-100'

  return (
    <div>
      <TwitterShareButton
        className={buttonClass}
        url={url}
        title={title}
        via={twitterHandle}
        hashtags={tags}
      >
        <span className="sr-only">Share on Twitter</span>
        <Twitter alt="" className={iconClass} />
      </TwitterShareButton>

      <LinkedinShareButton className={buttonClass} url={url}>
        <span className="sr-only">Share on LinkedIn</span>
        <Linkedin alt="" className={iconClass} />
      </LinkedinShareButton>

      <FacebookShareButton className={buttonClass} url={url}>
        <span className="sr-only">Share on Facebook</span>
        <Facebook alt="" className={iconClass} />
      </FacebookShareButton>
    </div>
  )
}

export default ShareButtons
