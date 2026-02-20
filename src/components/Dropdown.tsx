import { ChevronDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

const label = 'Label-Name'
const values = ['']
const placeholder = 'Add values'
const options = [
  { label: 'Dropdown 1', id: '1' },
  { label: 'Dropdown 2', id: '2' },
]
const Dropdown = () => {
  const container = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (container.current && !container.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full text-[13px]">
      {/* <label className="" htmlFor={label}>
        {label}
      </label> */}
      <div ref={container} className="relative min-w-[190px]" id={label}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={classNames(
            'bg-white rounded-lg h-[40px] p-2 text-gray-500 border border-transparent',
            { 'focus:ring-2 focus:ring-blue-600': true },
            'w-full text-left flex justify-between'
          )}
        >
          <span className="flex-1">{placeholder}</span>
          <ChevronDownIcon
            className={classNames('size-5', { 'rotate-180': isOpen })}
          />
        </button>
        <input
          aria-hidden="true"
          name={label}
          value={values}
          className="absolute top-0 left-0 pointer-events-none opacity-0"
        />
        {isOpen && (
          <div
            className={classNames(
              'absolute top-[calc(100%+4px)] left-0 right-0',
              'animate-dropdown-in overflow-hidden shadow-sm rounded-xl',
              'border border-gray-300 z-[200] bg-white'
            )}
          >
            <div className="py-2.5 px-3 border-b border-b-gray-300">
              <input
                name={'search' + label}
                placeholder="Search..."
                className={classNames(
                  'bg-white border border-gray-300 w-full py-2 px-2.5',
                  'rounded-lg text-[13px]'
                )}
              />
            </div>
            <div className="overflow-y-auto thin-scrollbar">
              {options.map((option) => (
                <div role="option">{option.label}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
