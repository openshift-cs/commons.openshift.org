import * as React from 'react'
import { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { X, Menu, Search } from 'react-feather'
import { motion, AnimatePresence } from 'framer-motion'

export const Dropdown = ({ children, onClick, state, ...props }) => {
  const [open, setOpen] = useState(false)

  let selectState
  if (state !== undefined) {
    selectState = state
  } else {
    selectState = open
  }

  const duration = 0.2
  const exitDuration = duration / 2 // exit duration should be faster than entry

  return (
    <>
      <DropdownMenu.Root
        open={selectState}
        onOpenChange={(value) => {
          state !== undefined ? onClick(value) : setOpen(value)
        }}
      >
        <DropdownMenu.Trigger
          className={`${
            selectState
              ? 'border-base-600 border-b-0 rounded-b-none'
              : 'border-base-400'
          } flex items-center justify-center h-10 w-10 bg-base-100 border-2 hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-base-500 rounded`}
        >
          {selectState ? (
            <X className="w-5 h-5 pointer-events-none" />
          ) : props.search ? (
            <Search className="w-5 h-5 pointer-events-none" />
          ) : (
            <Menu className="w-5 h-5 pointer-events-none" />
          )}
        </DropdownMenu.Trigger>

        <AnimatePresence>
          {selectState && (
            <DropdownMenu.Content
              /** forceMount
               * Docs say "Useful when controlling animation with React animation libraries"
               *
               * we want to force the component to mount
               * so that it can be animated from 0 to auto
               * */
              forceMount={true}
              align="end"
              avoidCollisions={false}
              className={`flex divide-y border-2 relative border-base-500 divide-base-400 rounded rounded-tr-none flex-col ${
                props.overflow ? ' ' : 'overflow-hidden'
              } bg-base-100 shadow-lg`}
              as={motion.nav}
              initial={{ height: 0, width: props.overflow ? 'auto' : 0 }}
              animate={{ height: 'auto', width: 'auto' }}
              transition={{ duration }}
              exit={{
                height: 0,
                width: props.overflow ? 'auto' : 0,
                transition: { duration: exitDuration },
              }}
            >
              {children}
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Root>
    </>
  )
}
