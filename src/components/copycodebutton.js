import React, { useState } from 'react'

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration))

function CopyCodeButton({ content, duration }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (content) => {
    const el = document.createElement(`textarea`)
    el.value = content
    el.setAttribute(`readonly`, ``)
    el.style.position = `absolute`
    el.style.left = `-9999px`
    document.body.appendChild(el)
    el.select()
    document.execCommand(`copy`)
    document.body.removeChild(el)
  }

  return (
    <button
      className="light absolute top-0 right-0 p-2 bg-primary-800 rounded-tr-md rounded-bl-md text-sm text-base-300 leading-none hover:bg-primary-600 focus:ring-2 focus:ring-primary-400 focus:ring-inset disabled:hover:bg-transparent disabled:focus:ring-0"
      disabled={copied}
      onClick={async () => {
        copyToClipboard(content)
        setCopied(true)
        await delay(duration)
        setCopied(false)
      }}
    >
      {copied ? `Copied` : `Copy`}
    </button>
  )
}

CopyCodeButton.defaultProps = {
  content: '',
  duration: 5000,
}

export default CopyCodeButton
