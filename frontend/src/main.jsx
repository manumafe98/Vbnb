import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'
import { VbnbApp } from './VbnbApp'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
      <VbnbApp/>
    </NextUIProvider>
)
