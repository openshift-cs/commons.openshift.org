import React from 'react'

const IconBox = ({ title, url, icon, titleText, flex, className = '', right, dark = false }) => {
  return (
    <a
      className={`${flex !== undefined ? 'flex justify-center' : 'inline-flex'} ${
        dark
          ? 'bg-primary-700 text-primary-100 hover:bg-base-200 hover:text-base-800 focus:bg-base-200 focus:text-base-800'
          : 'bg-primary-100 text-primary-700 hover:bg-base-800 hover:text-base-100 focus:bg-base-800 focus:text-base-100'
      } flex-row gap-2 items-center rounded-md border-2 border-primary-400 px-2 md:px-4 py-2 text-base lg:text-lg font-bold hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      href={url}
      title={titleText}
      target={url.indexOf('https://') === 0 ? '_blank' : '_self'}
      rel="noopener noreferrer"
    >
      {icon && !right && (
        <span aria-hidden="true" className="h-6 w-6 mr-1">
          {icon}
        </span>
      )}
      {title && <span>{title}</span>}
      {icon && right && (
        <span aria-hidden="true" className="h-6 w-6 ml-1">
          {icon}
        </span>
      )}
    </a>
  )
}

export default IconBox
