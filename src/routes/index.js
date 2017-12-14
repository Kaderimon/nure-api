import React from 'react'
import { BrowserRouter as Router,Switch , Route } from 'react-router-dom'
import Main from '../layouts/Main/Main.js'
import Index from '../pages/Home/Home'
import Groups from '../pages/Groups/Groups'
import Teachers from '../pages/Teachers/Teachers'
import Events from '../pages/Events/Events'
import NotFound from '../pages/NotFound/404'

const App = () => (
    <Router>
        <Main>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/groups" component={Groups}/>
                <Route exact path="/teachers" component={Teachers}/>
                <Route exact path="/groups/:id" component={Events}/>
                <Route exact path="/teachers/:id" component={Events}/>
                <Route path="/" component={NotFound}/>
            </Switch>
        </Main>
    </Router>
)
export default App;
        