import React from 'react'
import Seo from '../components/seo'

const Color = ({ color }) => {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900]

  return (
    <div>
      <div className="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
        <div className="w-20 shrink-0">
          <div className="h-10 flex flex-col justify-center">
            <div className="text-sm font-headings font-medium capitalize">
              {color}
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
          {shades.map((shade) => (
            <Swatch color={color} shade={shade} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Swatch = ({ color, shade }) => {
  return (
    <div className="space-y-1.5">
      <div className={`h-10 w-full rounded bg-${color}-${shade}`}></div>
      <div className="px-0.5 md:flex md:justify-between md:space-x-2">
        <span className="w-6">{shade}</span>
      </div>
    </div>
  )
}

export default function ThemePage() {
  const title = 'Theme'
  const palette = [
    'base',
    'primary',
    'secondary',
    'tertiary',
    'intermediate',
    'accent',
    'success',
    'warning',
    'caution',
    'alert',
  ]

  return (
    <div className="overflow-hidden text-center py-12 md:py-16 lg:pb-24">
      <div className="flex flex-col items-center space-y-32 page-wrapper">
        <section className="flex flex-col items-center space-y-8 w-full max-w-screen-lg relative z-0">
          <Seo title={title} />
          <h1 className="font-medium text-4xl font-headings leading-tight">
            {title}
          </h1>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <div className="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
                <div className="w-20 shrink-0">
                  <div className="h-10 flex flex-col justify-center">
                    <div className="text-sm font-headings font-medium">
                      Dark
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                  <div className="space-y-1.5">
                    <div className="h-10 w-full rounded bg-dark"></div>
                    <div className="px-0.5 md:flex md:justify-between md:space-x-2">
                      <span className="w-6"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
                <div className="w-20 shrink-0">
                  <div className="h-10 flex flex-col justify-center">
                    <div className="text-sm font-headings font-medium">
                      Base-0
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                  <div className="space-y-1.5">
                    <div className="h-10 w-full rounded bg-base-0"></div>
                    <div className="px-0.5 md:flex md:justify-between md:space-x-2">
                      <span className="w-6"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {palette.map((color) => (
              <Color color={color} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
