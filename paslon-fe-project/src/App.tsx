import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Paslon from './pages/input-paslon'

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-paslon" element={<Paslon />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

