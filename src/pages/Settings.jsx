// import { useBreakpoint } from '../hooks/useBreakpoint';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

import Switch from '../components/Switch';
import ColorPicker from '../components/ColorPicker';
import Button from '../components/Button';

import Form from '../blocks/Form';
import ThemeEditor from '../blocks/ThemeEditor';

import { setStyle } from '../functions/utils';

const Settings = () => {
    const { getDB, setDB, currentUser } = useAuth();
    const { theme, setTheme, colors, setColors } = useTheme();

    const [ loading, setLoading ] = useState(false);
    // const [ isDark, setIsDark ] = useState(false);

    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);
    const backgroundRef = useRef(null);
    const textRef = useRef(null);

    const props = {
        button: {
            classes: ['submit', 'text', 'reset'],
            type: 'submit',
            size: 'medium',
            text: 'Submit',
            theme: 'primary',
            style: {"display": "block", "margin": "0"}
            // disabled: loading
        }
    }

    const switchToDark = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {       
            const getColors = await getDB(false, 'colors', 'default')
            const getColorsData = getColors.data()

            if (theme === 'light') {
                setTheme('dark')
                // setDB('users', currentUser.uid, {
                //     theme: "dark"
                // }, true)
                setColors(getColorsData['dark'])
                console.log(theme)
            } else {
                setTheme('light')
                // setDB('users', currentUser.uid, {
                //     theme: "light"
                // }, true)
                setColors(getColorsData['light'])
            }
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {       
            const getUser = await getDB(false, 'users', currentUser.uid)
            const getUserData = getUser.data()
            const getUserTheme = getUserData['theme']
            const getColors = await getDB(false, 'colors', 'default')
            const getColorsData = getColors.data()
            const getColorsTheme = getColorsData[getUserTheme]
            // console.log(getColorsTheme)
            const editedTheme = {
                primary: primaryRef?.current.value,
                secondary: secondaryRef?.current.value,
                background: backgroundRef?.current.value,
                text: textRef?.current.value,
            }
            setColors(editedTheme)
            console.log(editedTheme)
            setDB('colors', 'default', {
                [theme]: editedTheme
            }, true)
            console.log(getColorsTheme)
            setStyle(getColorsTheme)
        } catch (error) {
            console.error(error)
        }
        setLoading(false);

        console.log('submitHandler is fired!')
    }

    useEffect(() => {
        // console.log(theme)
    }, [])

    const style = {
        "display": "inline-flex",
        "gap": "20px",
        "backgroundColor": "#fff",
        "padding": "20px",
        "margin": "10px 0",
        "borderRadius": "10px"
    }
    // const [newTheme, setNewTheme] = useState(theme);

    const changeHandler = async () => {
        // console.log()
        // setTheme((prevState) => {
        //     if (prevState === "light") {
        //         return 'dark'
        //     } else {
        //         return 'light'
        //     }
        // })
        // setDB('users', currentUser.uid, {
        //     theme: t
        // }, true)
        setLoading(true)

        try {       
            const getColors = await getDB(false, 'colors', 'default')
            const getColorsData = getColors.data()

            if (theme === 'light') {
                setTheme('dark')
                setDB('users', currentUser.uid, {
                    theme: "dark"
                }, true)
                setColors(getColorsData['dark'])
            } else {
                setTheme('light')
                setDB('users', currentUser.uid, {
                    theme: "light"
                }, true)
                setColors(getColorsData['light'])
            }
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        // console.log(theme)
        // setDB('users', currentUser.uid, {
        //     theme: theme
        // }, true)
    }, [])
    
    return (
        <>        
            <h2>Settings</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla repellat, tempore ducimus nostrum deleniti, velit fugiat cum in pariatur autem veritatis aliquam quia minima quo commodi, maxime inventore nemo magni.</p>
            {/* <Button classes={['logout', 'text', 'reset']} onClick={switchToDark}>Switch Theme to {theme === 'light' ? 'dark' : 'light'}</Button> */}
            <div>
                <Switch from="light" to="dark" value={theme} checked={theme === "dark" ? true : false} onChange={changeHandler} />
            </div>
            { 
                !loading &&             
                <Form classes={['theme-edit']} onSubmit={submitHandler}>
                    {/* <ThemeEditor colors={colors}/> */}

                    <div style={style}>
                        <ColorPicker classes={['primary']} colorValue={colors?.primary} refValue={primaryRef}/>
                        <ColorPicker classes={['secondary']} colorValue={colors?.secondary} refValue={secondaryRef}/>
                        <ColorPicker classes={['background']} colorValue={colors?.background} refValue={backgroundRef}/>
                        <ColorPicker classes={['text']} colorValue={colors?.text} refValue={textRef}/>
                    </div>
                    <div>
                        <Button {...props.button}>Save</Button>
                    </div>
                </Form>
            }
            {theme === 'light' ? <p>is {theme}</p> : <p>is {theme} </p>}
        </>
    )
}

export default Settings
