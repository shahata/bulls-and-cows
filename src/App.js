import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { initGame, fillSlot, emptySlot, getGuesses, colors, isSolved, getAnswer, getCurrentGuessIndex } from './game';

const Pin = props => <div className="Pin" style={{backgroundColor: props.answer === 'bull' ? 'red' : 'yellow'}}></div>;
const Circle = props => <div className="Circle" onClick={props.onClick} style={{backgroundColor: props.color}}></div>;
const Palette = props => <div className="Palette">{colors.map(color => <Circle onClick={() => props.onClick(color)} key={color} color={color}/>)}</div>;
const Answer = props => <div className="Answer">{props.answer ? props.answer.map(color => <Circle color={color}/>) : null}</div>

class Game extends Component {
  state = {
    data: initGame(10, 4)
  };

  startGame() {
    this.setState({data: initGame(10, 4)});
  }

  fillSlot(color) {
    this.setState({data: fillSlot(this.state.data, color)});
  }

  emptySlot(guess, slot) {
    this.setState({data: emptySlot(this.state.data, guess, slot)});
  }

  componentDidUpdate() {
    if (isSolved(this.state.data)) {
      setTimeout(() => {
        alert('כל הכבוד!');
        this.startGame();
      }, 100);
    }
  }

  render() {
    return (
      <div>
        <span className="NewGame" role="img" aria-label="New Game" onClick={() => this.startGame()}>🔄</span>
          <div className="Game">
            <div className="Board">
              {getGuesses(this.state.data).map(({guess, result}, i) => (
                <div className="Row" key={i}>
                  <div className="Result">
                    {result.map((answer, index) => <div key={index} className="PinSlot">{answer ? <Pin answer={answer}/> :  null}</div>)}
                  </div>
                  <div className="Counter">{i + 1}</div>
                  <div className={getCurrentGuessIndex(this.state.data) === i ? 'Guess Current' : 'Guess'}>
                    {guess.map((color, slot) => <div className="Slot" key={slot}>{color ? <Circle onClick={() => this.emptySlot(i, slot)} color={color}/> :  null}</div>)}
                  </div>
                </div>
              ))}
              <Answer answer={getAnswer(this.state.data)}/>
            </div>
            <Palette onClick={color => this.fillSlot(color)}/>
          </div>
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
        <Game/>
      </div>
    );
  }
}

export default App;
