import Router from 'next/router'
import { useLocalStorage } from '@ttrmz/react-utils'
import React from 'react'
import { useAuth, useRegister } from '../pages/api/rest/auth'

const LOCAL_STORAGE_USER_KEY = 'black_lotus'
const LOCAL_STORAGE_USER_INITIAL_STATE = {}

const UserContext = React.createContext({})

export function useUserContext() {
  return React.useContext(UserContext)
}

export function UserContextProvider({ value, ...rest }) {
  const [user, setUser] = useLocalStorage(
    LOCAL_STORAGE_USER_KEY,
    LOCAL_STORAGE_USER_INITIAL_STATE,
  )
  const [error, setError] = React.useState(null)

  const { auth } = useAuth()
  const { reg } = useRegister()

  const login = React.useCallback(
    (variables) => {
      auth(variables)
        .then((response) => {
          const error = response.data?.errors

          if (error) return setError(error)

          setUser({
            email: variables.email,
            token: response.data.access_token,
          })

          Router.push('/')
        })
        .catch(setError)
    },
    [auth, setUser],
  )

  const register = React.useCallback(
    (variables) => {
      reg(variables)
        .then((response) => {
          const error = response.data?.errors

          if (error) return setError(error)
        })
        .catch(setError)
    },
    [reg],
  )

  const logout = React.useCallback(() => {
    setUser(LOCAL_STORAGE_USER_INITIAL_STATE)
    Router.push('/')
  }, [setUser])

  const values = React.useMemo(
    () => ({
      user,
      logout,
      login,
      error,
      register,
    }),
    [user, logout, login, error, register],
  )

  return <UserContext.Provider value={values} {...rest} />
}
