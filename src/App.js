import React, { useState } from 'react';
import './App.css';
import { initGame, fillSlot, emptySlot, getGuesses, colors, isSolved, getAnswer, getCurrentGuessIndex } from './game';

const Circle = props => <div className="Circle" onClick={props.onClick} style={{ backgroundColor: props.color }}></div>;
const Palette = props => <div className="Palette">{colors.map(color => {
  return <Circle onClick={() => props.onClick(color)} key={color} color={color} />;
})}</div>;
const Answer = props => <div className="Answer">{props.answer ? props.answer.map(color => {
  return <div className="Slot" key={color}><Circle key={color} color={color} /></div>;
}) : null}</div>

function Game() {
  const [game, setGame] = useState(initGame(10, 4));
  const getBackground = () => isSolved(game) ? 'green' : getAnswer(game) ? 'red' : '';

  return (
    <div className="App" style={{ backgroundColor: getBackground() }}>
      <span className="NewGame" role="img" aria-label="Restart" onClick={() => setGame(initGame(10, 4))}>🔄</span>
      <div className="Game">
        <div className="Board">
          {getGuesses(game).map(({ guess, result }, i) => (
            <div className="Row" key={i}>
              <div className="Pins">
                {result.map((answer, index) => <div key={index} className="PinSlot">
                  {answer ? <div className={`Pin ${answer}`}></div> : null}
                </div>)}
              </div>
              <div className="Counter">{i + 1}</div>
              <div className={getCurrentGuessIndex(game) === i ? 'Guess Current' : 'Guess'}>
                {guess.map((color, slot) => <div className="Slot" key={slot}>
                  {color ? <Circle onClick={() => setGame(emptySlot(game, i, slot))} color={color} /> : null}
                </div>)}
              </div>
            </div>
          ))}
          <Answer answer={getAnswer(game)} />
        </div>
        <Palette onClick={color => setGame(fillSlot(game, color))} />
      </div>
    </div>
  )
}

export default Game;
