import React, { useContext, useEffect, useState } from 'react';

import Modal from '../Modal';
import ThemeContext from '../../context';
import './WordKeeper.css';

function WordKeeper() {
  const {
    starWords, setStarWord, temporaryStoreAll, setTemporaryStoreAll, indexLocalStorage, setIndexLocalStorage, focus, setFocus,
  } = useContext(ThemeContext);
  const [abc, setAbc] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
  const [word, setWord] = useState('');
  const [wordsSearch, setWordsSearch] = useState([]);
  const [words, setWords] = useState([]);
  const [push, setPush] = useState(0);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const arr = [];
  const arrActualWords = [];
  let count = 0;
  let i = 0;
  setFocus(true);

  async function searchWords() {
    const obj = {};
    try {
      const respons = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${words[i]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
      const result = await respons.json();
      if (result[0] === undefined) {
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
        // console.log('result----', result);
        arrActualWords.push(result);
        // console.log('arrActualWords----', arrActualWords);
        let respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${arrActualWords[0][count]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
        let result1 = await respons1.json();
        // console.log('result1---->>>', result1);
        obj.word = result1[0].meta.id;
        obj.fl = result1[0].fl;
        obj.shortdef = result1[0].shortdef[0];
        obj.uuid = result1[0].meta.uuid;
        count++;
        if (arrActualWords[0][count]) {
          respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${arrActualWords[0][count]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
          result1 = await respons1.json();
          // console.log('result1---->>>', result1);
          obj.word = result1[0].meta.id;
          obj.fl = result1[0].fl;
          obj.shortdef = result1[0].shortdef[0];
          obj.uuid = result1[0].meta.uuid;
          count++;
        }
        if (arrActualWords[0][count]) {
          respons1 = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${arrActualWords[0][count]}?key=7f3bd985-8595-4004-b953-672f4501bf55`);
          result1 = await respons1.json();
          // console.log('result1---->>>', result1);
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
    } catch (err) {
      console.log('err1 words -', err);
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
      while (i < 20) {
        searchWords();
        i++;
      }
    }
  }, [push]);
  useEffect(() => {
    setStarWord([...temporaryStoreAll]);
  }, [temporaryStoreAll]);
  useEffect(() => {
    if (localStorage.length) {
      if (indexLocalStorage < localStorage.length) {
        const str = localStorage[localStorage.key(indexLocalStorage)];
        const obj = JSON.parse(str);
        setStarWord([...starWords, obj]);
        setIndexLocalStorage(indexLocalStorage + 1);
      }
    }
  }, [indexLocalStorage]);
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
  function addToStars(el) {
    if (!localStorage[`${el.word}`]) {
      const newArr = [];
      newArr.push(el);
      setStarWord([...starWords, el]);
      console.log('el', el);
      localStorage[`${el.word}`] = JSON.stringify(el);
    }
  }
  function showModal(el) {
    setModal(true);
    setDataModal(el);
  }
  return (
    <div className="WordKeeper">
      {modal && <Modal dataModal={dataModal} setModal={setModal} />}
      <div>
        Search in WodrKeeper:
        <input onChange={inputChange} value={word} />
        <button type="button" onClick={clickPush}>Push</button>
      </div>
      {wordsSearch[0] && (
        <>
          {
            wordsSearch.map((el) => (
              <div className="Word">
                <span className="Word1" onClick={() => showModal(el)}><b>{{ ...el }.word}</b></span>
&nbsp;
                <span className="Word2" onClick={() => showModal(el)}><i>{{ ...el }.fl}</i></span>
&nbsp;
                <span className="Word3" onClick={() => showModal(el)}>{{ ...el }.shortdef}</span>
                <button className="Word4" type="button" onClick={() => addToStars(el)}>add to stars</button>
              </div>
            ))
          }
        </>
      )}
    </div>
  );
}

export default WordKeeper;
