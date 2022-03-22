import React from 'react'
import {NativeRouter} from 'react-router-native'
import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'
import {name as appName} from '../../app.json'

import store from '../adapters/store/store'
import Preloader from '../shared/preloader'
import Routes from './routes'
import Loading from './components/loading'
import auth from '../adapters/security/auth'

const App = () => (
  <Provider store={store}>
    <Preloader before={auth.loadToken} loading={<Loading />}>
      <NativeRouter>
        <Routes />
      </NativeRouter>
    </Preloader>
  </Provider>
)

AppRegistry.registerComponent(appName, () => App)
