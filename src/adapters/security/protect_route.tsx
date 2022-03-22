import React, {ReactElement, useEffect, useState} from 'react'
import {Location} from 'react-router'
import {useLocation, Navigate} from 'react-router-dom'
import {UserType} from '../../entities/user'
import store from '../store/store'

type ProtectedProps = {
  element: ReactElement
  noAuthRedirect?: string
}

const Protected = ({element, noAuthRedirect = '/login'}: ProtectedProps): ReactElement => {
  const location: Location = useLocation()
  const [authUser, setAuthUser] = useState<UserType | null>(null)

  useEffect(() => {
    const {authState} = store.getState()
    setAuthUser(authState.user)
  }, [])

  store.subscribe(() => {
    const {authState} = store.getState()
    setAuthUser(authState.user)
  })

  if (!authUser) {
    return <Navigate to={noAuthRedirect} state={{from: location}} replace />
  }
  return element
}

export default Protected
