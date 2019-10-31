import { createGlobalStyle } from 'styled-components'
import theme from 'config/theme'

const GlobalStyle = createGlobalStyle`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      outline: none;

      &::before,
      &::after {
        box-sizing: border-box;
      }
    }
    
    html, body, #root {
      height: 100%;
      background-color: ${theme.colors.wildSand};
      overflow-y: hidden;
    }
    
    input {
      -webkit-box-shadow: inset 0 0 0px 9999px transparent;
    }
  
    @-ms-viewport{
      width: device-width;
    }

    .Toastify__toast--default {
      box-shadow: none !important;
      background: transparent !important;
    }

    input[type='file'] {
      opacity: 0;
    }
  `

export default GlobalStyle
