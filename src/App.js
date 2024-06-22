import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchDrugs from './components/SearchDrugs';
import DrugDetails from './components/DrugDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/drugs/search" component={SearchDrugs} />
        <Route path="/drugs/:drug_name" component={DrugDetails} />
      </Switch>
    </Router>
  );
}

export default App;
