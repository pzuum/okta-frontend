/** example of react router */

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, About, Contact } from '../pages';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
            </Switch>
        </Router>
    );
}