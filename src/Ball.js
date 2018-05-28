import React from 'react'
import PropTypes from 'prop-types'

export default class Ball extends React.Component {
  constructor(props) {
    super(props)
    this.getColor = this.getColor.bind(this)
  }

  getColor() {
    switch(this.props.color) {
      case 0: return 'gray'
      case 1: return 'purple'
      case 2: return 'blue'
      case 3: return 'pink'
      case 4: return 'yellow'
      case 5: return 'green'
    }
  }

  render() {
    return (
      <div 
        className={`ball ${this.getColor()}`}>
      </div>
    )
  }
}

Ball.defaultProps = {
  color: 0
}

Ball.propTypes = {
  color: PropTypes.number
}