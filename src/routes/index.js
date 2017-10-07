import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Main from '../layouts/Main/Main.js'
import Index from '../pages/index.js'

const App = () => (
    <Main>
        <Router>
            <Route exact path="/" component={Index}/>
        </Router>
    </Main>
)
export default App;
        