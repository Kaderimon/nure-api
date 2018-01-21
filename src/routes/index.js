import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from '../layouts/Main/Main.js'

const App = () => (
    <Router>
        <Route path="/" component={Main}/>
    </Router>
)
export default App;
        