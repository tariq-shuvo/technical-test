import axios from 'axios'

const setAdminAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-admin-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-admin-auth-token']
  }
}

export default setAdminAuthToken
