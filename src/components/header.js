import { Link } from 'gatsby'
import React, { useState } from 'react'
import { Dropdown } from './drop-down'
import * as Menu from '@radix-ui/react-dropdown-menu'
import { ColorModeToggle } from './color-toggle'
import { ReactComponent as Logo } from '../images/Logo-OSC.svg'
import { ReactComponent as LogoDark } from '../images/Logo-OSC-Reverse.svg'
import SocialMediaIcons from './social-media-icons'
import SearchBar from './searchbar'
import HelloBar from './hello-bar'

export const Header = ({ siteTitle }) => {
  const [Open, setOpen] = useState(false)

  const onDropDownClick = (state) => {
    setOpen(state)
  }

  const MenuItems = [
    /*{
      path: '/events/',
      title: 'Events',
    },*/
    {
      path: '/gatherings/',
      title: 'Gatherings',
    },
    {
      path: '/sigs/',
      title: 'SIGs',
    },
    {
      path: '/testimonials/',
      title: 'Testimonials',
    },
  ]

  return (
    <>
      <HelloBar />
      <header className="top-0 sticky z-50 flex flex-col w-full border-b border-base-300">
        <div className="w-full order-2 h-14 md:h-[4.5rem] bg-base-100 dark:bg-base-0">
          <nav className="w-full flex items-center justify-between h-full page-wrapper">
            <Link
              className="flex-shrink-0 rounded-sm ring-offset-4 ring-offset-base-0 hover:ring-base-500 focus:ring-primary-600 hover:ring-2 focus:outline-none focus:ring-2 h-8 md:h-9 lg:h-10"
              to="/"
            >
              <Logo className="dark:hidden" alt="" />
              <LogoDark className="hidden dark:block" alt="" />
              <span className="sr-only">{siteTitle}</span>
            </Link>
            <div className="flex space-x-3 md:space-x-3 lg:space-x-4 items-center">
              <span className="hidden ml-4 md:flex md:hidden">
                <SearchBar />
              </span>

              <ul className="hidden md:flex items-center md:space-x-3 lg:space-x-4">
                {MenuItems.map((item) => (
                  <li className="flex" key={item.path}>
                    <Link
                      to={item.path}
                      className="px-2 lg:px-3 py-2 border-2 border-base-400 rounded hover:border-base-500 focus:ring-2 focus:ring-primary-600 text-base lg:text-lg font-medium"
                      activeClassName="border-secondary-500 bg-secondary-200 text-secondary-800 hover:border-secondary-500"
                      partiallyActive={true}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex md:hidden space-x-3">
                <Dropdown>
                  {MenuItems.map((item) => (
                    <Menu.Item
                      key={item.title}
                      as={Link}
                      to={item.path}
                      style={{ 'outline-offset': '-1px' }}
                      className="p-3 font-medium overflow-hidden text-left text-base-700 w-full hover:outline-none hover:bg-base-200 focus:ring-2 focus:ring-inset focus:ring-base-500"
                      activeClassName="bg-secondary-100 hover:bg-secondary-100 text-secondary-700 dark:bg-secondary-200 dark:text-secondary-900"
                      partiallyActive={true}
                    >
                      {item.title}
                    </Menu.Item>
                  ))}
                </Dropdown>
                <div className="hidden">
                  <Dropdown state={Open} overflow search onClick={onDropDownClick}>
                    <SearchBar state={Open} onClick={onDropDownClick} />
                  </Dropdown>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="bg-secondary-800 flex text-secondary-100 items-center dark:bg-secondary-200 dark:text-secondary-900 w-full h-10">
          <div className="flex w-full page-wrapper md:justify-center items-center">
            <SocialMediaIcons />
          </div>
          <div className="absolute flex items-center justify-center right-0 mr-1 md:mr-2">
            <ColorModeToggle />
          </div>
        </div>
      </header>
    </>
  )
}
