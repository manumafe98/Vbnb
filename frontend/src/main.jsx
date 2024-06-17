import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { VbnbApp } from './VbnbApp'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <NextUIProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<VbnbApp/>}/>
          </Routes>
        </AuthProvider>
      </NextUIProvider>
    </BrowserRouter>
)
