export const ChevronDown = ({fill, size, height, width, ...props}) => {
    return (
      <svg
        fill="none"
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
      </svg>
    )
}

export const DownloadCloud = () => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="10em" 
      height="10em" 
      viewBox="0 0 16 14"
    >
      <path 
        fill="currentColor"
        d="M12 11c-.28 0-.5-.22-.5-.5s.22-.5.5-.5c1.65 0 3-1.35 3-3s-1.35-3-3-3h-1.05c-.18 0-.34-.09-.43-.25C9.88 2.65 8.76 2 7.51 2c-1.93 0-3.5 1.57-3.5 3.5c0 .28-.22.5-.5.5h-.5c-1.1 0-2 .9-2 2s.9 2 2 2c.28 0 .5.22.5.5s-.22.5-.5.5c-1.65 0-3-1.35-3-3s1.35-3 3-3h.03c.25-2.25 2.16-4 4.47-4c1.49 0 2.89.76 3.72 2h.78c2.21 0 4 1.79 4 4s-1.79 4-4 4Z"/><path fill="currentColor" d="M7.5 13a.47.47 0 0 1-.35-.15l-2.5-2.5c-.2-.2-.2-.51 0-.71s.51-.2.71 0l2.15 2.15l2.15-2.15c.2-.2.51-.2.71 0s.2.51 0 .71l-2.5 2.5c-.1.1-.23.15-.35.15Z"/><path fill="currentColor" d="M7.5 12.75c-.28 0-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5s.5.22.5.5v6c0 .28-.22.5-.5.5"
      />
    </svg>
  )
}

export const Search = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="5em" 
      height="5em" 
      viewBox="0 0 24 24"
    >
      <path 
        fill="currentColor" 
        d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
      />
    </svg>
  )
}

export const EditIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
)

export const DeleteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
)

export const CheckIcon = (props) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="1em" 
      height="1em"
      viewBox="0 0 20 20"
      strokeLinecap="round"
      strokeLinejoin="round"      
      strokeWidth={1.5}
      {...props}
    >
      <path fill="currentColor" 
      d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
      />
    </svg>
  )
}
