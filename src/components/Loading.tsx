import classNames from 'classnames'

const Loading = ({
  loadingText,
  size = 'lg',
}: {
  loadingText: string
  size: 'sm' | 'lg'
}) => {
  return (
    <div className={classNames('flex items-center justify-center gap-4')}>
      <svg
        className={classNames(
          {
            'size-7': size === 'lg',
            'size-5': size === 'sm',
          },
          'animate-spin text-blue-600'
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {loadingText && <p className="">{loadingText}</p>}
    </div>
  )
}

export default Loading
