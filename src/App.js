import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import Congrats from './Congrats';
import Input from './Input';
import SecretWordReveal from './SecretWordReveal';
import NewWordButton from './NewWordButton';
import GuessedWords from './GuessedWords';
import TotalGuesses from './TotalGuesses';

import { getSecretWord, resetGame } from './actions';

function App() {
  const success = useSelector((state) => state.success);
  const guessedWords = useSelector((state) => state.guessedWords);
  const secretWord = useSelector((state) => state.secretWord);
  const giveUp = useSelector((state) => state.giveUp);

  const dispatch = useDispatch();

  const handleResetAction = () => {
    dispatch(resetGame());
  };

  useEffect(() => {
    dispatch(getSecretWord());
  }, [dispatch]);

  console.log(secretWord);
  console.log(success, guessedWords, secretWord, giveUp);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <SecretWordReveal display={giveUp} secretWord={secretWord} />
      <NewWordButton
        display={success || giveUp}
        resetAction={handleResetAction}
      />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
      <TotalGuesses guessCount={guessedWords.length} />
    </div>
  );
}

export default App;
