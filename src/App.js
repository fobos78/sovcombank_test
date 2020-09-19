import React, { useState } from 'react';

import MyRou from './componets/MyRou';
import ThemeContext from './context';
import './App.css';

function App() {
  const [starWords, setStarWord] = useState([]);
  const [focus, setFocus] = useState(true);

  return (
    <ThemeContext.Provider value={{ starWords, setStarWord, focus, setFocus }}>
      <div className="App">
        <MyRou />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
