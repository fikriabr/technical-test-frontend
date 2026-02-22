import React, { Fragment } from 'react'
import { DEFAULT_PAGE_LIMIT, PAGE_OPTIONS } from '../constants/api'
import { getPaginationRange } from '../utils/pageRange'
import classNames from 'classnames'

interface PaginationProp {
  counter: number
  pageSize: number
  changePageSize: (size: number) => void
  currentPage: number
  changePage: (page: number) => void
  counterLoading?: boolean
}

const Pagination: React.FC<PaginationProp> = ({
  counter,
  changePageSize,
  pageSize,
  currentPage,
  changePage,
  counterLoading,
}) => {
  const onChangePageSize = (val: string) => {
    const value = parseInt(val) ?? DEFAULT_PAGE_LIMIT
    changePageSize(value)
    changePage(0)
  }

  const start = currentPage * pageSize + 1
  const totalPage = Math.ceil(counter / pageSize)
  const end = Math.min((currentPage + 1) * pageSize, counter)

  const pageList = getPaginationRange(currentPage, totalPage)

  const btnStyles = classNames(
    'p-1 px-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md disabled:bg-gray-300 text-xs lg:text-base'
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 justify-center pt-2 items-center lg:justify-between">
      {counterLoading || isNaN(counter) ? (
        <div className="font-semibold">Loading counter</div>
      ) : (
        <div className="font-semibold">
          Showing {`${start} - ${end}`} from {counter}
        </div>
      )}

      <div className="flex justify-center">
        <select
          className="border border-black py-1.5 px-5 rounded-lg"
          onChange={(e) => onChangePageSize(e.target.value)}
          defaultValue={DEFAULT_PAGE_LIMIT}
        >
          {PAGE_OPTIONS.map((option, _index) => (
            <option value={option} key={String(_index)}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-1 justify-center lg:justify-end">
        <button
          onClick={() => changePage(0)}
          className={btnStyles}
          disabled={currentPage === 0}
        >
          First
        </button>
        <button
          onClick={() => changePage(currentPage)}
          className={btnStyles}
          disabled={currentPage === 0}
        >
          Prev
        </button>

        {pageList.map((page) => {
          const pageIndex = parseInt(String(page))
          return (
            <Fragment key={page}>
              {isNaN(parseInt(String(page))) ? (
                <span>...</span>
              ) : (
                <button
                  onClick={() => {
                    changePage(pageIndex)
                  }}
                  disabled={currentPage === pageIndex}
                  className="p-1 px-2 lg:min-w-9 bg-blue-500 hover:bg-blue-700 text-white rounded-md disabled:bg-blue-700 disabled:text-blue-100 text-xs"
                >
                  {pageIndex + 1}
                </button>
              )}
            </Fragment>
          )
        })}

        <button
          onClick={() => changePage(currentPage + 1)}
          className={btnStyles}
          disabled={currentPage === totalPage - 1}
        >
          Next
        </button>
        <button
          onClick={() => changePage(totalPage - 1)}
          className={btnStyles}
          disabled={currentPage === totalPage - 1}
        >
          Last
        </button>
      </div>
    </div>
  )
}

export default Pagination
