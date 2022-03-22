import React, {lazy, ReactElement, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'
import Protected from '../adapters/security/protect_route'
import Loading from './components/loading'

const Home = lazy(() => import('./pages/home'))

const Router = (): ReactElement => (
  <Suspense fallback={Loading}>
    <Routes>
      <Route path="/protected" element={<Protected element={<Home />} />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Suspense>
)

export default Router
