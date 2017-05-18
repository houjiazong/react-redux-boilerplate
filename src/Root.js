import {
  Component
} from 'react'
import axios from 'axios'

import {makeRoutes} from './routes'

class Root extends Component {
  componentDidMount () {
    axios({
      method: 'GET',
      url: '/api/s',
      params: {
        wd: 'baidu'
      }
    }).then(res => {
      console.log(res)
    })
  }
  render () {
    return makeRoutes()
  }
}

export default Root
