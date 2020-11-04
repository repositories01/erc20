import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DrawList from './pages/DrawList';
import NewDrawForm from './pages/NewDrawForm';


function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/draw-list" exact component={DrawList} />
            <Route path="/new-draw" exact component={NewDrawForm} />
            <Route path= "/new-draw/:id" exact component={NewDrawForm} />
        </BrowserRouter>
    );
}

export default Routes;