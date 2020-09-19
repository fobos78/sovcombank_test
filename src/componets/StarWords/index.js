import React, { useContext, useState } from 'react';

import Modal from '../Modal';
import ThemeContext from '../../context';
import './StarWords.css';

function StarWords() {
  const { starWords, setStarWord, focus, setFocus } = useContext(ThemeContext);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [word, setWord] = useState('');
  function delWord(el) {
    const arr = starWords.filter(item => item.word !== el.word);
    setStarWord([...arr]);
  }
  setFocus(false);
  function MyDragStart() {
    console.log('start');
    // this.style = { { backgroundColor: 'red' } };
    // requestAnimationFrame(() => (this.style.backgroundColor = 'transparent'), 0);
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
    
  }
  return (
    <>
      <div className="StarWords" onDragEnter={MyDragEnter} onDrop={dragDrop}>
      {modal && <Modal dataModal={dataModal} setModal={setModal} />}
      <div>
        Search word:
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
