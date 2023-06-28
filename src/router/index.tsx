/** example of react router */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { Callback } from '../pages/callback';
import { Profile } from '../pages/profile';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route  path="/" Component={Login} />
                <Route  path="/callback/:provider" Component={Callback} />
                <Route path="/profile" Component={Profile} />
                <Route path="*">"404"</Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;