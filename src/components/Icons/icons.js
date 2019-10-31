import React from 'react'
import IconNames from './iconNames'

const Icons = {
  [IconNames.Alert]: {
    element: (
      <g key="alert">
        <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
      </g>
    )
  },
  [IconNames.AlertOutline]: {
    element: (
      <g key="alert-outline">
        <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
      </g>
    )
  },
  [IconNames.Delete]: {
    element: (
      <g key="delete">
        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
      </g>
    )
  },
  [IconNames.Edit]: {
    element: (
      <g key="edit">
        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
      </g>
    )
  },
  [IconNames.ImageOff]: {
    element: (
      <g key="image-off">
        <path d="M2.28,3L1,4.27L3,6.27V19A2,2 0 0,0 5,21H17.73L19.73,23L21,21.72L2.28,3M4.83,3L21,19.17V5C21,3.89 20.1,3 19,3H4.83M8.5,13.5L11,16.5L12,15.25L14.73,18H5L8.5,13.5Z" />
      </g>
    )
  },
  [IconNames.LogOut]: {
    element: (
      <g key="logout">
        <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
      </g>
    )
  },
  [IconNames.Message]: {
    element: (
      <g key="message">
        <path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M4,4V17.17L5.17,16H20V4H4M6,7H18V9H6V7M6,11H15V13H6V11Z" />
      </g>
    )
  },
  [IconNames.NoImage]: {
    element: (
      <g key="no-image">
        <path d="M2.28,3L1,4.27L3,6.27V19A2,2 0 0,0 5,21H17.73L19.73,23L21,21.72L2.28,3M4.83,3L21,19.17V5C21,3.89 20.1,3 19,3H4.83M8.5,13.5L11,16.5L12,15.25L14.73,18H5L8.5,13.5Z" />
      </g>
    )
  },
  [IconNames.Percent]: {
    element: (
      <g key="percent">
        <path d="M18.5,3.5L3.5,18.5L5.5,20.5L20.5,5.5M7,4A3,3 0 0,0 4,7A3,3 0 0,0 7,10A3,3 0 0,0 10,7A3,3 0 0,0 7,4M17,14A3,3 0 0,0 14,17A3,3 0 0,0 17,20A3,3 0 0,0 20,17A3,3 0 0,0 17,14Z" />
      </g>
    )
  },
  [IconNames.Plus]: {
    element: (
      <g key="plus">
        <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </g>
    )
  },
  [IconNames.Question]: {
    element: (
      <g key="question">
        <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
      </g>
    )
  }
}

export default Icons
