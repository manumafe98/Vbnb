import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { VbnbApp } from './VbnbApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
      <VbnbApp/>
    </NextUIProvider>
)
