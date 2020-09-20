import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import ThemeContext from '../../context';
import Header from '../Header';
import WordKeeper from '../WordKeeper';
import StarWords from '../StarWords';

function Rou() {
  // const { starWords, setStarWord, temporaryStoreAll, setTemporaryStoreAll, indexLocalStorage, setIndexLocalStorage, focus, setFocus } = useContext(ThemeContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/star">
            <StarWords />
          </Route>
          <Route path="/">
            <WordKeeper />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Rou;
