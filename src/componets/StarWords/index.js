import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ThemeContext from '../../context';
import './StarWords.css';

function StarWords() {
  const history = useHistory();
  console.log('<<<<<<<<history>>>>>>>>>>>', history.location.pathname);
  const { starWords, setStarWord, focus, setFocus } = useContext(ThemeContext);
  function delWord(el) {
    const arr = starWords.filter(item => item.word !== el.word);
    setStarWord([...arr]);
  }
  setFocus(false);
  return (
    <>
      <div className="StarWords">
        {starWords[0] && (
          <>
            {
              starWords.map((el) => (
                <div className="Word">
                  <span><b>{{ ...el }.word}</b></span>
&nbsp;
                  <span><i>{{ ...el }.fl}</i></span>
&nbsp;
                  <span className="Word3">{{ ...el }.shortdef}</span>
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
