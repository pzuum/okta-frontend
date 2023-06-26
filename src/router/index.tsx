/** example of react router */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route  path="/" Component={Login} />
            </Routes>
        </Router>
    );
}

export default AppRouter;