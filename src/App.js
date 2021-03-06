import React, { useState } from 'react';

import MyRou from './componets/MyRou';
import ThemeContext from './context';
import './App.css';

function App() {
  const [starWords, setStarWord] = useState([]);
  const [temporaryStoreAll, setTemporaryStoreAll] = useState([]);
  const [indexLocalStorage, setIndexLocalStorage] = useState(0);
  const [focus, setFocus] = useState(true);

  return (
    <ThemeContext.Provider value={{ starWords, setStarWord, temporaryStoreAll, setTemporaryStoreAll, indexLocalStorage, setIndexLocalStorage, focus, setFocus }}>
      <div className="App">
        <MyRou />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
