import React, {
  Component,
  PropTypes
} from 'react'

class App extends Component {
  render() {
    return (
      <div className='appContainer'>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
