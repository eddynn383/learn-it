import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import useTheme from './hooks/useTheme';

import { setStyle } from './functions/utils';

import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Login from './pages/Signin';
import Unauthorized from './pages/Unauthorized';
import Settings from './pages/Settings';

import RequireAuth from './helper/RequireAuth';

import './assets/design/layout.scss';
import './local-files/defaultTheme.json'
import db from './local-files/db.json'

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

const App = () => {
    const [ loading, setLoading ] = useState(true);
    const { getDB, currentUser } = useAuth();
    const { theme, setTheme, colors, setColors } = useTheme();

    const themeInit = async () => { 
        try {       
            setLoading(true)  

            const user = await getDB(false, 'users', currentUser.uid)
            const userData = user.data()
            const userTheme = userData['theme']
            setTheme(userTheme)

            const getColors = await getDB(false, 'colors', 'default')
            const getColorsData = getColors.data()
            setColors(getColorsData[userTheme])

            setLoading(false)  
        } catch (error) {
            console.error(error)
        }
    }


    // const getUsers = (page=0) => {
    //     UserDataService.getAll(page).then(res => {
    //         console.log(res.data)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }


    // const styleLoader = async () => { 
    //     try { 
    //         setLoading(true)      
    //         const user = await getDB(false, 'users', currentUser.uid)
    //         const userData = user.data()
    //         const userTheme = userData['theme']
    //         const getColors = await getDB(false, 'colors', 'default')
    //         const getColorsData = getColors.data()

    //         setTheme(userTheme)
    //         setColors(getColorsData[userTheme])
    //         setStyle(getColorsData[userTheme])
    //         setLoading(false)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    
    useEffect(() => {
        themeInit()
        // console.log(theme)
        // styleLoader()
        // getUsers()
        // console.log(db)
    }, [theme])
    
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
