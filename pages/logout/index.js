import React from 'react'
import { useUserContext } from '../../contexts/userContext'

function Index() {
  const { logout } = useUserContext()
  React.useEffect(() => {
    logout()
  }, [])
  return null
}

export default Index
