import {shuffle} from 'lodash';

export const colors = ['red', 'yellow', 'green', 'orange', 'pink', 'purple', 'blue', 'white'];

export function initGame(guesses, slots) {
  return {
    guesses: new Array(guesses).fill().map(x => new Array(slots).fill()),
    answer: shuffle(colors).slice(-1 * slots)
  };
}

export function fillSlot(data, color) {
  const guess = data.guesses.find(guess => guess.some(slot => slot === undefined));
  if (guess && guess.indexOf(color) === -1) {
    const i = guess.indexOf(undefined);
    guess.splice(i, 1, color);
  }
  return data;
}

export function emptySlot(data, guess, slot) {
  const current = data.guesses.findIndex(guess => guess.some(slot => slot === undefined));
  if (current === guess) {
    data.guesses[guess][slot] = undefined;
  }
  return data;
}

export function getGuesses(data) {
  return data.guesses.map(guess => {
    if (guess.some(slot => slot === undefined)) {
      return {guess, result: guess.map(x => undefined)};
    } else {
      return {guess, result: guess.map((x, i) => x === data.answer[i] ? 'bull' : data.answer.indexOf(x) > -1 ? 'cow' : undefined).sort()};
    }
  })
}

export function isSolved(data) {
  return getGuesses(data).some(({result}) => result.every(x => x ==='bull'));
}

export function getLoserAnswer(data) {
  if (getGuesses(data).every(({guess, result}) => guess.every(x => x !== undefined) && !result.every(x => x === 'bull'))) {
    return data.answer;
  }
}
