import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DrawList from './pages/DrawList';
import NewDrawForm from './pages/NewDrawForm';


function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/draw-list" component={DrawList} />
            <Route path="/new-draw" component={NewDrawForm} />
        </BrowserRouter>
    );
}

export default Routes;