import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useLoopApi, type FetchFn } from '../hooks/useLoopApi'
import Loading from './Loading'

interface DropdownProp {
  values?: string[]
  onChangeValues?: (value: string) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  fetchFn: FetchFn
  routeId?: string[]
}
const Dropdown: React.FC<DropdownProp> = ({
  disabled = false,
  label,
  onChangeValues,
  values,
  placeholder,
  fetchFn,
  routeId,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { options, loading, loadMore, hasMore, errorMessage } = useLoopApi(
    fetchFn,
    routeId
  )

  const filterOption = options.filter((opt) => values?.includes(opt.id))
  const selectedOption = Array.from(
    new Map(filterOption.map((item) => [item.id, item])).values()
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (container.current && !container.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const el = listRef.current
    console.log('rel', el)
    if (!el) return

    function onScroll() {
      const nearBottom =
        el!.scrollHeight - el!.scrollTop - el!.clientHeight < 50
      console.log('nearBottom', nearBottom)
      if (nearBottom) loadMore()
    }

    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [loadMore, loading, hasMore, isOpen, routeId])

  const [firstOpen, setFirstOpen] = useState(true)
  useEffect(() => {
    if (!isOpen || !firstOpen) return
    setFirstOpen(false)
    loadMore()
  }, [isOpen, firstOpen])

  return (
    <div className="relative w-full text-[13px]">
      <div ref={container} className="relative min-w-[100px]" id={label}>
        <div
          aria-disabled={disabled}
          onClick={() => {
            if (disabled) return
            setIsOpen((prev) => !prev)
          }}
          className={classNames(
            'rounded-lg min-h-[40px] p-2 pl-5 text-gray-500 border border-transparent',
            {
              'focus:ring-2 focus:ring-blue-600': true,
              'bg-white': !disabled,
              'bg-gray-100': disabled,
            },
            'w-full text-left flex justify-between'
          )}
        >
          <div className="flex flex-wrap flex-1 gap-2">
            {selectedOption.length ? (
              <>
                {selectedOption.map((opt) => (
                  <div className="px-2 border flex items-center rounded-lg">
                    <span className="text-xs">{opt.label}</span>
                    <XMarkIcon
                      onClick={() => onChangeValues?.(opt.id)}
                      className="size-4"
                    />
                  </div>
                ))}
              </>
            ) : (
              placeholder
            )}
          </div>
          <ChevronDownIcon
            className={classNames('size-5 transition-all duration-200', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        </div>
        {isOpen && (
          <div
            className={classNames(
              'absolute top-[calc(100%+4px)] left-0 right-0',
              'animate-dropdown-in overflow-hidden shadow-sm rounded-xl',
              'border border-gray-300 z-[200] bg-white'
            )}
            role="listbox"
            aria-multiselectable="true"
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
            <div
              className="overflow-y-auto thin-scrollbar h-64 relative"
              ref={listRef}
            >
              {options.map((option, _index) => (
                <div
                  key={_index}
                  role="option"
                  onClick={() => onChangeValues?.(option.id)}
                  className="border-b px-3 py-2 flex gap-4 relative"
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={values?.includes(option.id)}
                    className="accent-blue-500"
                  />
                  <div>
                    <div>
                      {option.label} {option.subLabel && `- ${option.subLabel}`}
                    </div>
                    <div className="text-gray-400 flex gap-2 items-center">
                      {option.color && (
                        <div
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor: option.color
                              ? option.color
                              : 'white',
                          }}
                        />
                      )}
                      <span>{option.id}</span>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="px-3 py-5 w-36 rounded-xl drop-shadow-xl flex gap-4 h-9 fixed inset-0 m-auto bg-white justify-center">
                  <Loading size="sm" loadingText="Loading..." />
                </div>
              )}

              {errorMessage && !loading && (
                <div className="px-5 py-4 h-fit w-fit rounded-lg border border-red-500 flex gap-4 fixed inset-0 m-auto bg-white justify-center ">
                  Error: {errorMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
