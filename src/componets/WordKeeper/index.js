import React, { useContext, useEffect, useState } from 'react';

import ThemeContext from '../../context';
import './WordKeeper.css';

function WordKeeper() {
  const { starWords, setStarWord } = useContext(ThemeContext);// избранное
  const [word, setWord] = useState('');// используем для контроля input
  const [wordSearch, setWordSearch] = useState('');// слово по которому делаем запрос
  const [abcWords, setAbcWords] = useState([]);// список по алфавиту
  const [i, setI] = useState(0);// количество слов в списке
  const [inputCh, setInputCh] = useState(0);// реакция на ввод в input
  const [count, setCount] = useState(0);// количество слов в списке
  const [arrWords, setArrWords] = useState([]);// массив с предворительным списком
  const [nearWords, setNearWords] = useState(['']);// массив с близкими словами
  const [abc, setAbc] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);// массив алфавита

  async function searchWords() {
    const obj = {};
    const respons = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${wordSearch}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
    const result = await respons.json();
    console.log('result', result);
    if (result[0].meta.id) {
      obj.word = result[0].meta.id;
      obj.fl = result[0].fl;
      obj.shortdef = result[0].shortdef[0];
      // console.log('result', result);
      setAbcWords(result);
      if (i < 5) { // количество слов в списке
        setArrWords([...arrWords, obj]);
        setI(i + 1);
        setWordSearch(obj.word + abc[count]);
      }
    } else {
      console.log('resultNo', result);
      setNearWords([...result]);
      setAbcWords(['']);
      setCount(count + 1);
      for (let z = 0; z < 2; z++) {
        const respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${nearWords[z]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
        const result1 = await respons1.json();
        console.log('result111', result1);
        console.log('test');
        if (result1[z].meta.id) {
          obj.word = result1[z].meta.id;
          obj.fl = result1[z].fl;
          obj.shortdef = result1[z].shortdef[0];
          setAbcWords(result1);
          if (i < 5) { // количество слов в списке
            setArrWords([...arrWords, obj]);
            setI(i + 1);
          }
        }
        //setWordSearch(obj.word + abc[count]);
      }
    }
  }

  useEffect(() => {
    searchWords();
  }, [inputCh, wordSearch]);
  function inputChange(event) {
    setWord(event.target.value);
    setWordSearch(event.target.value);
    setArrWords([]);
    setCount(0);
    setI(0);
    setInputCh(inputCh + 1);
  }
  return (
    <div className="WordKeeper">
      <div>
        Search word:
        <input onChange={inputChange} value={word} />
        <button type="button" onClick={() => setWordSearch(word)}>Push</button>
      </div>
      {arrWords[0] && (
        <>
          {/* <div>
            <span><b>{abcWords[0].hwi.hw}</b></span>
&nbsp;
            <span><i>{abcWords[0].fl}</i></span>
&nbsp;
            <span>{abcWords[0].shortdef[0]}</span>
          </div> */}
          <h3>{console.log('arrWords>>>', { ...arrWords[i] }.word)}</h3>
          {
            arrWords.map((el, x) => (
              <div>
                <h3>{console.log('arrWords>>>', { ...arrWords[x] }.word)}</h3>

                <span><b>{{ ...el }.word}</b></span>
&nbsp;
                <span><i>{{ ...el }.fl}</i></span>
&nbsp;
                <span>{{ ...el }.shortdef}</span>
              </div>
            ))
          }
        </>
      )}
    </div>
  );
}

export default WordKeeper;
