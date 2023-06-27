/** example of react router */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { Callback } from '../pages/callback';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route  path="/" Component={Login} />
                <Route path="/callback/Okta" Component={Callback} />
            </Routes>
        </Router>
    );
}

export default AppRouter;