import axios from 'axios'

export function useAuth() {
  const auth = (data) =>
    axios({
      method: 'post',
      url: 'https://exoticplant.vercel.app/public/api/login',
      data,
    })

  return { auth }
}

export function useRegister() {
  const reg = (data) =>
    axios({
      method: 'post',
      url: 'https://exoticplant.vercel.app/public/api/register',
      data,
    })
  return { reg }
}
