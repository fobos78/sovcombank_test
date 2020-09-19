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
  let i = 0;

  async function searchWords() {
    const obj = {};
    const respons = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${words[i]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
    const result = await respons.json();
    if (result[0] === undefined) {
      // i++;
      i--;
      count++;
    } else
    if (result[0].meta) {
      obj.word = result[0].meta.id;
      obj.fl = result[0].fl;
      obj.shortdef = result[0].shortdef[0];
      obj.uuid = result[0].meta.uuid;
      if (!(arr.find((el) => el.word === obj.word))) {
        arr.push(obj);
      } else {
        i--;
      }
    } else {
      console.log('result----', result);
      arrActualWords.push(result);
      console.log('arrActualWords----', arrActualWords);
      let respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${arrActualWords[0][count]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
      let result1 = await respons1.json();
      console.log('result1---->>>', result1);
      obj.word = result1[0].meta.id;
      obj.fl = result1[0].fl;
      obj.shortdef = result1[0].shortdef[0];
      obj.uuid = result1[0].meta.uuid;
      count++;
      if (arrActualWords[0][count]) {
        respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${arrActualWords[0][count]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
        result1 = await respons1.json();
        console.log('result1---->>>', result1);
        obj.word = result1[0].meta.id;
        obj.fl = result1[0].fl;
        obj.shortdef = result1[0].shortdef[0];
        obj.uuid = result1[0].meta.uuid;
        count++;
      }
      if (arrActualWords[0][count]) {
        respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${arrActualWords[0][count]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
        result1 = await respons1.json();
        console.log('result1---->>>', result1);
        obj.word = result1[0].meta.id;
        obj.fl = result1[0].fl;
        obj.shortdef = result1[0].shortdef[0];
        obj.uuid = result1[0].meta.uuid;
        count++;
      }
      if (!(arr.find((el) => el.word === obj.word))) {
        arr.push(obj);
      } else {
        i--;
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
      // for (let i = 0; i < 10; i++) {
      //   searchWords(i);
      // }

      while (i < 20) {
        searchWords();
        i++;
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
  function addToStars() {
   
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
              <div className="Word">
                <span><b>{{ ...el }.word}</b></span>
&nbsp;
                <span><i>{{ ...el }.fl}</i></span>
&nbsp;
                <span className="Word3">{{ ...el }.shortdef}</span>
                <button type="button" onClick={addToStars}>add to stars</button>
              </div>
            ))
          }
        </>
      )}
    </div>
  );
}

export default WordKeeper;
