import { getLetterMatchCount } from './';

describe('getLetterMatchCount', () => {
  const secretWord = 'party';

  test('returns correct count when there are no matching letters', () => {
    const guessedWord = 'bones';

    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    expect(letterMatchCount).toBe(0);
  });

  test('returns the correct count when there are three matching letters', () => {
    const guessedWord = 'train';

    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    expect(letterMatchCount).toBe(3);
  });

  test('returns the correct count when there are duplicate letters in the guess', () => {
    const guessedWord = 'parka';

    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    expect(letterMatchCount).toBe(3);
  });
});
