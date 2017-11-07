import React from 'react'
import { BrowserRouter as Router,Switch , Route } from 'react-router-dom'
import Main from '../layouts/Main/Main.js'
import Index from '../pages/index'
import Students from '../pages/Students/Students'
import Teachers from '../pages/Teachers/Teachers'

const App = () => (
    <Router>
        <Main>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/students" component={Students}/>
                <Route exact path="/teachers" component={Teachers}/>
                <Route exact path="/students/:id" component={Students}/>
                <Route exact path="/teachers/:id" component={Teachers}/>
            </Switch>
        </Main>
    </Router>
)
export default App;
        