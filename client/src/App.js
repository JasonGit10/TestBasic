import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BarraBusqueda from './components/BarraBusqueda';
import Resultados from './components/Resultados';
import Detalle from './components/Detalle';

function App() {

  //State de la app
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Switch>
        <Route 
          exact path="/"
          component={() => <BarraBusqueda 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />}
        />
        <Route 
          exact path="/items"
          component={Resultados}
        />
        <Route 
          exact path="/items/:id"
          component={Detalle}
        />
      </Switch>
    </Router>
  );
}

export default App;
