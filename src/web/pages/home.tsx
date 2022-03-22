import React, {Fragment, ReactElement} from 'react'
import {useNavigate, NavigateFunction, useLocation, Location} from 'react-router'
import auth from '../../adapters/security/auth'
import Alert from '../components/alert'

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
    <Fragment>
      <h1>Hello World{auth.isAuth() && `, ${auth.getAuthUser()!.username}`}!</h1>
      {auth.isAuth() ? <button onClick={logoutHandler}>Logout</button> : <button onClick={loginHandler}>Login</button>}
      <Alert />
    </Fragment>
  )
}

export default PageHome
