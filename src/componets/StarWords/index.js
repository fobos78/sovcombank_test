import React, { useContext, useEffect, useState } from 'react';

import Modal from '../Modal';
import ThemeContext from '../../context';
import './StarWords.css';

function StarWords() {
  const { starWords, setStarWord, temporaryStoreAll, setTemporaryStoreAll, focus, setFocus } = useContext(ThemeContext);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [word, setWord] = useState('');
  const [temporaryStore, setTemporaryStore] = useState([]);
  function delWord(el) {
    const arr = starWords.filter(item => item.word !== el.word);
    const arr1 = temporaryStoreAll.filter(item => item.word !== el.word);
    setTemporaryStoreAll([...arr1]);
    setStarWord([...arr]);
  }
  setFocus(false);
  function MyDragStart() {
    console.log('start');
  }
  function MyDragEnd(el) {
    console.log('end');
    const arr = starWords.filter(item => item.word !== el.word);
    arr.push(el);
    setStarWord([...arr]);
  }
  function MyDragEnter() {
    console.log('Enter');
  }
  function dragDrop() {
    console.log('Drop');
  }
  function showModal(el) {
    setModal(true);
    setDataModal(el);
  }
  function inputChange(event) {
    setWord(event.target.value);
  }
  function clickPush() {
    setTemporaryStore([...starWords]);
    function recursionArr(arrWords, index) {
      const arr = arrWords.filter((el) => el.word[index] === word[index]);
      if (index === word.length - 1) {
        return arr;
      }
      index++;
      return recursionArr(arr, index);
    }
    setStarWord([...recursionArr(starWords, 0)]);
  }
  function showAll() {
    setStarWord([...temporaryStoreAll]);
  }
  function showAbbreviation() {
    const arr = starWords.filter((el) => el.fl === 'abbreviation');
    setStarWord([...arr]);
  }
  function showNoun() {
    const arr = starWords.filter((el) => el.fl === 'noun');
    setStarWord([...arr]);
  }
  function showVerb() {
    const arr = starWords.filter((el) => el.fl === 'verb');
    setStarWord([...arr]);
  }
  useEffect(() => {
    setTemporaryStoreAll([...starWords]);
  }, []);
  return (
    <>
      <div className="StarWords" onDragEnter={MyDragEnter} onDrop={dragDrop}>
        {modal && <Modal dataModal={dataModal} setModal={setModal} />}
        <div>
          <button type="button" onClick={() => showAll()}>show all</button>
          <button type="button" onClick={() => showAbbreviation()}>abbreviation</button>
          <button type="button" onClick={() => showNoun()}>noun</button>
          <button type="button" onClick={() => showVerb()}>verb</button>
        </div>
        <div>
          Search in StarWords:
        <input onChange={inputChange} value={word} />
          <button type="button" onClick={clickPush}>Push</button>
        </div>
        {starWords[0] && (
          <>
            {
              starWords.map((el) => (
                <div key={{ ...el }.uuid} className="Word" draggable="true" onDragStart={MyDragStart} onDragEnd={() => MyDragEnd(el)}>
                  <span onClick={() => showModal(el)}><b>{{ ...el }.word}</b></span>
&nbsp;
                  <span onClick={() => showModal(el)}><i>{{ ...el }.fl}</i></span>
&nbsp;
                  <span className="Word3" onClick={() => showModal(el)}>{{ ...el }.shortdef}</span>
                  <button type="button" onClick={() => delWord(el)}>del</button>
                </div>
              ))
            }
          </>
        )}
      </div>
    </>
  );
}

export default StarWords;
