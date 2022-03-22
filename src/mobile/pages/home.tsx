import React, {ReactElement} from 'react'
import {useNavigate, NavigateFunction, useLocation, Location} from 'react-router'
import {SafeAreaView, Text, Button} from 'react-native'
import auth from '../../adapters/security/auth'

const PageHome = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate()
  const location: Location = useLocation()

  const loginHandler = (): void => {
    const locationState: any = location.state
    auth.logIn('user', 'password', false, () => {
      navigate(locationState ? locationState.from : '/')
    })
  }

  const logoutHandler = (): void => {
    auth.logOut(() => {
      navigate('/')
    })
  }

  return (
    <SafeAreaView>
      <Text>Hello World{auth.isAuth() && `, ${auth.getAuthUser()!.username}`}!</Text>
      {auth.isAuth() ? <Button title="Logout" onPress={logoutHandler} /> : <Button title="Login" onPress={loginHandler} />}
    </SafeAreaView>
  )
}

export default PageHome
