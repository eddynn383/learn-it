import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';

import { ThemeContext } from "./context/themeContext";

import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Login from './pages/Signin';
import Unauthorized from './pages/Unauthorized';
import Settings from './pages/Settings';

import RequireAuth from './helper/RequireAuth';

import './assets/design/layout.scss';

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

const App = () => {
    const theme = useContext(ThemeContext);
    const currTheme = theme.state.currentTheme;
    console.log(currTheme)

    const { getDB } = useAuth();
    // const [ theme, setTheme ] = useState('default-theme');
    const [ palette , setPalette ] = useState('default-user');
    const [ colors, setColors ] = useState();
    const [ loading, setLoading ] = useState(true)

    const root = document.querySelector(':root');



    const getCourses = async () => { 
        try {       
            const db = await getDB(false, 'colors', 'default-theme')
            const allThemes = db.data()
            setColors(allThemes[palette])

        } catch (error) {
            console.error(error)
        }
    } 

    colors?.forEach((item) => {
        // console.log(item)
        root.style.setProperty('--theme-color-' + item.name, '#' + item.value);
    }) 

    useEffect(() => {
        getCourses()
        setLoading(false)
    }, [])
    
    return (
        <>

            { 

                loading ?
                <p>Loading...</p>
                : 
                <div className="layout layout--two-column" theme={theme}>  
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                            <Route path="/" element={<Layout />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/catalog" element={<Catalog />} />
                                <Route path="/settings" element={<Settings />} />
                            </Route>
                        </Route>
                        <Route path="unauthorized" element={<Unauthorized />} />
                    </Routes>
                </div>
            }
        </>
    )
};

export default App;
