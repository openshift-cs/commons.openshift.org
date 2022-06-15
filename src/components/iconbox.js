import React from 'react'

const IconBox = ({ title, url, icon, flex, right, className }) => {
  return (
    <a
      target={url?.indexOf('https://') === 0 ? '_blank' : '_self'}
      className={`${
        flex !== undefined ? 'flex justify-center' : 'inline-flex'
      } bg-base-100 dark:bg-base-0 flex-row space-x-2 items-center rounded-md border-2 border-base-400 px-2 md:px-4 py-2 text-base lg:text-lg font-bold hover:border-base-500 hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary-600 ${className}`}
      rel="noopener noreferrer"
      href={url}
    >
      {icon && !right && (
        <span aria-hidden="true" className="h-6 w-6 mr-1">
          {icon}
        </span>
      )}
      <span>{title}</span>
      {icon && right && (
        <span aria-hidden="true" className="h-6 w-6 ml-1">
          {icon}
        </span>
      )}
    </a>
  )
}

export default IconBox
