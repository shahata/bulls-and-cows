import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { initGame, fillSlot, emptySlot, getGuesses, colors, isSolved, getLoserAnswer } from './game';

const Answer = props => <div className="Pin" style={{backgroundColor: props.answer === 'bull' ? 'red' : 'yellow'}}></div>;
const Circle = props => <div className="Circle" onClick={props.onClick} style={{backgroundColor: props.color}}></div>;
const Palette = props => <div className="Palette">{colors.map(color => <Circle onClick={() => props.onClick(color)} color={color}/>)}</div>;
const Loser = props => <div className="Answer">{props.answer ? props.answer.map(color => <Circle color={color}/>) : null}</div>

class Board extends Component {
  render() {
    return (
      <div className="Board">
        {this.props.guesses.map(({guess, result}, i) => (
          <div className="Row">
            <div className="Result">
              {result.map(answer => <div className="PinSlot">{answer ? <Answer answer={answer}/> :  null}</div>)}
            </div>
            <div className="Counter">{i + 1}</div>
            <div className="Guess">
              {guess.map((color, slot) => <div className="Slot">{color ? <Circle onClick={() => this.props.onClick(i, slot)} color={color}/> :  null}</div>)}
            </div>
          </div>
        ))}
        <Loser answer={this.props.answer}/>
      </div>
    );
  }
}

class Game extends Component {
  state = {
    started: false
  };

  startGame() {
    alert('מתחילים');
    this.setState({started: true, data: initGame(10, 4)});
  }

  fillSlot(color) {
    this.setState({data: fillSlot(this.state.data, color)});
  }

  emptySlot(guess, slot) {
    this.setState({data: emptySlot(this.state.data, guess, slot)});
  }

  componentDidUpdate() {
    if (this.state.data && isSolved(this.state.data)) {
      setTimeout(() => {
        alert('כל הכבוד!');
        this.setState({started: false, data: undefined});
      }, 100);
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.startGame()}>שלום</button>
        {this.state.started ?
          <div className="Game">
            <Board answer={getLoserAnswer(this.state.data)} guesses={getGuesses(this.state.data)} onClick={(guess, slot) => this.emptySlot(guess, slot)}/>
            <Palette onClick={color => this.fillSlot(color)}/>
          </div> : null}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">בול פגיעה</h1>
        </header>
        <p className="App-intro">
          גל תלמי
        </p>
        <Game/>
      </div>
    );
  }
}

export default App;
