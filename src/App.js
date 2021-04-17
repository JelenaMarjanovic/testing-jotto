import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import Congrats from './Congrats';
import Input from './Input';
import GuessedWords from './GuessedWords';
import TotalGuesses from './TotalGuesses';

import { getSecretWord } from './actions';

function App() {
  const success = useSelector((state) => state.success);
  const guessedWords = useSelector((state) => state.guessedWords);
  const secretWord = useSelector((state) => state.secretWord);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, [dispatch]);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
      <TotalGuesses guessCount={guessedWords.length} />
    </div>
  );
}

export default App;
