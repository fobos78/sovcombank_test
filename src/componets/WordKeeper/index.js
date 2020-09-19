import React, { useContext, useEffect, useState } from 'react';

import ThemeContext from '../../context';
import './WordKeeper.css';

function WordKeeper() {
  const { starWords, setStarWord } = useContext(ThemeContext);// избранное
  const [abc, setAbc] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);// массив алфавита
  const [word, setWord] = useState('');
  const [wordsSearch, setWordsSearch] = useState([]);
  const [words, setWords] = useState([]);
  const [push, setPush] = useState(0);
  const arr = [];
  const arrActualWords = [];
  let count = 0;

  async function searchWords(i) {
    const obj = {};
    const respons = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${words[i]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
    const result = await respons.json();
    if (result[0] === undefined) {
      i++;
    } else
    if (result[0].meta) {
      obj.word = result[0].meta.id;
      obj.fl = result[0].fl;
      obj.shortdef = result[0].shortdef[0];
      if (!(arr.find((el) => el.word === obj.word))) {
        arr.push(obj);
      }
    } else {
      console.log('result----', result);
      arrActualWords.push(result);
      const respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${arrActualWords[0][count]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
      const result1 = await respons1.json();
      obj.word = result1[0].meta.id;
      obj.fl = result1[0].fl;
      obj.shortdef = result1[0].shortdef[0];
      // count = Math.floor(Math.random() * 5);
      count++;
      if (!(arr.find((el) => el.word === obj.word))) {
        arr.push(obj);
      }
    }

    const arr4 = arr.sort((a, b) => {
      if (a.word.toLowerCase() > b.word.toLowerCase()) {
        return 1;
      }
      if (a.word.toLowerCase() < b.word.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    setWordsSearch([...arr4]);
  }

  useEffect(() => {
    if (push) {
      for (let i = 0; i < 10; i++) {
        searchWords(i);
      }
    }
  }, [push]);
  function inputChange(event) {
    setWord(event.target.value);
    setWords([]);
    count = 0;
  }
  function clickPush() {
    let str = word;
    const arr1 = [];
    for (let i = 0; i < 26; i++) {
      arr1.push(str);
      setWords([...arr1]);
      str = word + abc[i];
    }
    setPush(push + 1);
  }
  return (
    <div className="WordKeeper">
      <div>
        Search word:
        <input onChange={inputChange} value={word} />
        <button type="button" onClick={clickPush}>Push</button>
      </div>
      {/* <p>{console.log('words>>>', words)}</p>
      <p>{console.log('wordsSearch>>>', wordsSearch)}</p> */}
      {wordsSearch[0] && (
        <>
          {
            wordsSearch.map((el) => (
              <div>
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
