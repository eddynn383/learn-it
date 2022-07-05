import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Login from './pages/Signin';
import Unauthorized from './pages/Unauthorized';

import RequireAuth from './helper/RequireAuth';

import './assets/design/layout.scss';

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

const App = () => {
    return (
        <div className="layout layout--two-column">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/catalog" element={<Catalog />} />
                    </Route>
                </Route>
                <Route path="unauthorized" element={<Unauthorized />} />
            </Routes>
        </div>
    )
};

export default App;
