import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import * as Toggle from '@radix-ui/react-toggle'
import { Moon, Sun } from 'react-feather'

export const ColorModeToggle = () => {
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined,
    (prefersDark) => {
      if (localStorage.theme === undefined) {
        setIsDark(prefersDark)
      }
    },
  )

  const [isDarkMessage, setDarkMessage] = useState(
    'Light Mode enabled - Switch to Dark Mode',
  )

  const userSelectedTheme = () => {
    if (typeof window !== 'undefined' && window) {
      if (localStorage.theme === 'dark') {
        return true
      }
      if (localStorage.theme === 'light') {
        return false
      }
      if (localStorage.theme === undefined) {
        return systemPrefersDark
      }
    }
  }

  const [isDark, setIsDark] = useState(userSelectedTheme)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      setDarkMessage('Dark Mode enabled - Switch to Light Mode')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      setDarkMessage('Light Mode enabled - Switch to Dark Mode')
    }
  }, [isDark])

  return (
    <Toggle.Root
      aria-label={isDarkMessage}
      title={isDarkMessage}
      className="rounded hover:bg-base-800 dark:hover:bg-primary-400 hover:border-base-500 focus:outline-none focus:ring-2 focus:ring-base-800 dark:focus:ring-base-500"
      onPressedChange={() => {
        if (isDark) {
          localStorage.theme = 'light'
        } else {
          localStorage.theme = 'dark'
        }
        return setIsDark(!isDark)
      }}
    >
      {isDark ? (
        <Moon className="h-7 w-7 p-1 dark:text-primary-700 text-base-400" />
      ) : (
        <Sun className="h-7 w-7 p-1 text-base-400 dark:text-primary-700" />
      )}
    </Toggle.Root>
  )
}
