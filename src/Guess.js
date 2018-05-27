import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'react-bootstrap'

export default class Guess extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 0,
      open: false
    }
    this.onClickColor = this.onClickColor.bind(this)
  }

  onClickColor(color) {
    this.setState({
      color: color
    })
  }

  render() {
    return (
      <Popover
        placement="top"
      >
        <Ball color={1} click={this.onClickColor(1)}/>
        <Ball color={2} click={this.onClickColor(2)}/>
        <Ball color={3} click={this.onClickColor(3)}/>
        <Ball color={4} click={this.onClickColor(4)}/>
        <Ball color={5} click={this.onClickColor(5)}/>
      </Popover>
    )
  }
}

Guess.defaultProps = {
  color: 0
}

Guess.propTypes = {
  color: PropTypes.number
}