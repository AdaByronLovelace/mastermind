import React from 'react'
import { Grid, Row, Col, Well, Panel } from 'react-bootstrap'
import Ball from './Ball'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [],
      solution: [0,0,0,0],
      currGuess: [],
      won: false
    }
    this.clickColor = this.clickColor.bind(this)
    this.pickSolution = this.pickSolution.bind(this)
    this.checkGuessColors = this.checkGuessColors.bind(this)
    this.checkGuessPosition = this.checkGuessPosition.bind(this)
    this.reset = this.reset.bind(this)
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

  reset() {
    this.setState({
      guesses: [],
      solution: [0,0,0,0],
      currGuess: [],
      won: false
    }, () => this.pickSolution())
  }

  clickColor(color) {
    let guesses = this.state.guesses
    let currGuess = this.state.currGuess
    let newGuess = {}
    let won = false
    currGuess.push(color)

    if (currGuess.length === 4) {
      newGuess = {
        numColor: this.checkGuessColors(currGuess, this.state.solution),
        numPos: this.checkGuessPosition(currGuess, this.state.solution),
        nums: currGuess
      }
      guesses.push(newGuess)
      won = newGuess.numPos === 4 ? true : false
      this.setState({
        guesses: guesses,
        currGuess: [],
        won: won
      })
    } else {
      this.setState({
        currGuess: currGuess
      })
    }
  }

  checkGuessColors(guess, sol) {
    let num = 0
    let index = -1
    let solution = [...sol]
    for (let i=0;i<4;i++) {
      index = solution.indexOf(guess[i])
      if (index > -1) {
        solution.splice(index, 1)
        num = num + 1
      }
    }
    return num
  }
  checkGuessPosition(guess, solution) {
    let num = 0
    for (let i=0;i<4;i++) {
      num = solution[i] === guess[i] ? num + 1 : num
    }
    return num
  }

  render() {
    return (
      <div className="center">
        <h1>Mastermind</h1>
        <div className="section">
          {
            this.state.won ? 
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
        </div>
        { this.state.won ? 
          <h2 className="won">You won in {this.state.guesses.length} tries!</h2> : 
          <h3>Number of tries: {this.state.guesses.length}</h3>}
        <div className="section">
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
                  { guess.nums.map((item, index) => {
                    return (
                      <Ball color={item} key={index}></Ball>
                    )
                  })}
                  </td>
                  <td>
                    { guess.numColor }
                  </td>
                  <td>
                    { guess.numPos }
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        {
          this.state.won ? 
          <div className="section">
            <button onClick={this.reset}>New Game</button>
          </div> :
          <div className="section">
            <h4>Make your guess:</h4>
            <div className={`ball-select purple`} onClick={() => this.clickColor(1)}/>
            <div className={`ball-select blue`} onClick={() => this.clickColor(2)}/>
            <div className={`ball-select pink`} onClick={() => this.clickColor(3)}/>
            <div className={`ball-select yellow`} onClick={() => this.clickColor(4)}/>
            <div className={`ball-select green`} onClick={() => this.clickColor(5)}/>
          </div>
        }
      </div>
    )
  }
}
