import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../Header';
import WordKeeper from '../WordKeeper';
import StarWords from '../StarWords';

function Rou() {
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
