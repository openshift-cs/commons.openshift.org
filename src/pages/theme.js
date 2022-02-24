import React from 'react'
import Seo from '../components/seo'

const Color = ({ color }) => {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900]

  return (
    <div className="flex flex-col gap-1 md:gap-4 sm:flex-row text-xs">
      <div className="w-20 shrink-0">
        <div className="h-10 flex flex-col justify-center">
          <div className="text-sm font-headings font-medium capitalize">
            {color}
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 grid grid-cols-10 gap-2">
        {shades.map((shade) => (
          <Swatch color={color} shade={shade} />
        ))}
      </div>
    </div>
  )
}

const Swatch = ({ color, shade }) => {
  return (
    <div className="space-y-1.5">
      <div
        className={`h-10 w-full rounded border border-base-700 bg-${color}-${shade}`}
      ></div>
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
    <section className="my-8 flex flex-col items-center gap-8 w-full">
      <Seo title={title} />
      <h1 className="font-medium text-4xl font-headings leading-tight">
        {title}
      </h1>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <div className="flex flex-col gap-1 md:gap-4 sm:flex-row text-xs">
            <div className="w-20 shrink-0">
              <div className="h-10 flex flex-col justify-center">
                <div className="text-sm font-headings font-medium">Dark</div>
              </div>
            </div>
            <div className="min-w-0 flex-1 grid grid-cols-10 gap-2">
              <div className="space-y-1.5">
                <div className="h-10 w-full rounded border border-base-700 bg-dark"></div>
                <div className="px-0.5 md:flex md:justify-between md:space-x-2">
                  <span className="w-6"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-1 md:gap-4 sm:flex-row text-xs">
            <div className="w-20 shrink-0">
              <div className="h-10 flex flex-col justify-center">
                <div className="text-sm font-headings font-medium">Base-0</div>
              </div>
            </div>
            <div className="min-w-0 flex-1 grid grid-cols-10 gap-2">
              <div className="space-y-1.5">
                <div className="h-10 w-full rounded border border-base-700 bg-base-0"></div>
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

        <div class="hidden grid grid-cols-1 gap-8">
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium">Dark</div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-dark"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium">Base-0</div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-0"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    base
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-base-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    primary
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-primary-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    secondary
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-secondary-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    tertiary
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-tertiary-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    intermediate
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-intermediate-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    accent
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-accent-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    success
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-success-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    warning
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-warning-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    caution
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-caution-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
              <div class="w-20 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                  <div class="text-sm font-headings font-medium capitalize">
                    alert
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-3 md:gap-x-2">
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-100"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">100</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-200"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">200</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-300"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">300</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-400"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">400</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-500"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">500</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-600"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">600</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-700"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">700</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-800"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">800</span>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-10 w-full rounded bg-alert-900"></div>
                  <div class="px-0.5 md:flex md:justify-between md:space-x-2">
                    <span class="w-6">900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
