import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {} from './electron'

import store from '../adapters/store/store'
import Preloader from '../shared/preloader'
import Routes from './routes'

import 'core-js/features/array/flat-map'
import 'core-js/features/map'
import 'core-js/features/promise'
import 'core-js/features/set'
import 'raf/polyfill'
import 'whatwg-fetch'

import Loading from './components/loading'
import auth from '../adapters/security/auth'

ReactDOM.render(
  <Provider store={store}>
    <Preloader before={auth.loadToken} loading={<Loading />}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </Preloader>
  </Provider>,
  document.getElementById('root'),
)
