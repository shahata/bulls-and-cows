import { shuffle } from 'lodash';

export const colors = ['red', 'yellow', 'green', 'orange', 'pink', 'purple', 'blue', 'white'];

export function initGame(guesses, slots) {
  return {
    guesses: new Array(guesses).fill().map(x => new Array(slots).fill()),
    answer: shuffle(colors).slice(-1 * slots)
  };
}

export function getCurrentGuessIndex(data) {
  return data.guesses.findIndex(guess => guess.some(slot => slot === undefined));
}

export function fillSlot(data, color) {
  const guess = data.guesses[getCurrentGuessIndex(data)];
  if (guess && guess.indexOf(color) === -1) {
    const i = guess.indexOf(undefined);
    guess.splice(i, 1, color);
  }
  return { ...data };
}

export function emptySlot(data, guess, slot) {
  const current = getCurrentGuessIndex(data);
  if (current === guess) {
    data.guesses[guess][slot] = undefined;
  }
  return { ...data };
}

export function getGuesses(data) {
  return data.guesses.map(guess => {
    if (guess.some(slot => slot === undefined)) {
      return { guess, result: guess.map(x => undefined) };
    } else {
      return {
        guess, result: guess.map((x, i) => {
          if (x === data.answer[i]) {
            return 'bull';
          } else if (data.answer.indexOf(x) > -1) {
            return 'cow';
          } else {
            return undefined;
          }
        }).sort()
      };
    }
  })
}

export function isSolved(data) {
  return getGuesses(data).some(({ result }) => result.every(x => x === 'bull'));
}

export function getAnswer(data) {
  if (isSolved(data) || getGuesses(data).every(({ guess, result }) => guess.every(x => x !== undefined))) {
    return data.answer;
  } else {
    return undefined;
  }
}
