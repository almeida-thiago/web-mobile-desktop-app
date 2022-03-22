import React from 'react'
import {Routes, Route} from 'react-router-native'
import Home from './pages/home'

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
)

export default Router
