import React from 'react'
import { Grid, Row, Col, Well, Panel } from 'react-bootstrap'
import Ball from './Ball'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [
        [
          {
            color: 1,
            rightColor: false,
            rightPosition: false
          }, {
            color: 3,
            rightColor: true,
            rightPosition: false
          }, {
            color: 1,
            rightColor: false,
            rightPosition: false
          }, {
            color: 2,
            rightColor: true,
            rightPosition: true
          }
        ], [
          {
            color: 4,
            rightColor: false,
            rightPosition: false
          }, {
            color: 1,
            rightColor: true,
            rightPosition: false
          }, {
            color: 2,
            rightColor: false,
            rightPosition: false
          }, {
            color: 5,
            rightColor: true,
            rightPosition: false
          }
        ]
      ],
      newGuess: [],
      currGuess: 0,
      solution: [0,0,0,0],
      revealed: false
    }
    this.clickColor = this.clickColor.bind(this)
    this.pickSolution = this.pickSolution.bind(this)
  }
  componentDidMount() {
    this.pickSolution()
  }
  pickSolution() {
    let solution = []
    for (let i=0;i<4;i++) {
      solution.push(Math.floor(Math.random() * 5) + 1)
    }
    this.setState({
      solution: solution
    })
  }

  clickColor(color) {
    let guess = this.state.newGuess
    let guesses = this.state.guesses
    const ind = guess.length - 1
    const rightColor = this.state.solution.includes(color)
    const rightPosition = this.state.solution[ind] === color
    if (ind === 3) {
      guesses.push(guess)
      this.setState({
        guesses: guesses,
        newGuess: []
      })
    } else {
      guess.push({
        color: color,
        rightColor: rightColor,
        rightPosition: rightPosition
      })
      this.setState({
        newGuess: guess
      })
    }
  }
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col>
            <h1>Mastermind</h1>
          </Col>
        </Row>
        <Well className="center">
          {
            this.state.revealed ? 
            this.state.solution.map((color, index) => {
              return (
                <Ball color={color} key={index}/>
              )
            }) : 
            this.state.solution.map((color, index) => {
              return (
                <Ball color={0} key={index}/>
              )
            })
          }
        </Well>
        <Panel bsStyle="info">
          <Panel.Heading>
            <Panel.Title componentClass="h3" className="center">Number of tries: {this.state.guesses.length}</Panel.Title>
          </Panel.Heading>
          <Panel.Body className="center">
            <table>
              <thead>
              <tr>
                <th>your guess</th>
                <th>color</th>
                <th>color &amp; position</th>
              </tr>
              </thead>
              <tbody>
              { this.state.guesses.map((guess, index) => {
                return (
                  <tr key={index}>
                    <td>
                    { guess.map((item, index) => {
                      return (
                        <Ball color={item.color} key={index}/>
                      )
                    })}
                    </td>
                    <td>
                      { guess.filter(item => {
                        return (item.rightColor)
                      }).length}
                    </td>
                    <td>
                    { guess.filter(item => {
                        return (item.rightPosition)
                      }).length}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </Panel.Body>
        </Panel>
        <Well className="center">
          <h4>Make your guess:</h4>
          <div className={`ball-select purple`} onClick={() => this.clickColor(1)}/>
          <div className={`ball-select blue`} onClick={() => this.clickColor(2)}/>
          <div className={`ball-select pink`} onClick={() => this.clickColor(3)}/>
          <div className={`ball-select yellow`} onClick={() => this.clickColor(4)}/>
          <div className={`ball-select green`} onClick={() => this.clickColor(5)}/>
        </Well>
      </Grid>
    )
  }
}
