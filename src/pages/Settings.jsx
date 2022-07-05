// import { useBreakpoint } from '../hooks/useBreakpoint';
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import Accordion from '../blocks/Accordion';
import Card from '../blocks/Card';
import Button from '../components/Button';

const Settings = () => {
    const theme = useContext(ThemeContext);
    const currTheme = theme.state.currentTheme;
    const clickHandler = () => {
        if (currTheme !== "light") {
            theme.dispatch({ type: "LIGHTMODE" });
        } else {
            theme.dispatch({ type: "DARKMODE" });
        }
    }

    return (
        <>        
            <h2>Settings</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla repellat, tempore ducimus nostrum deleniti, velit fugiat cum in pariatur autem veritatis aliquam quia minima quo commodi, maxime inventore nemo magni.</p>
            <Button classes={'test'} onClick={clickHandler}>Switch Theme</Button>
            {/* <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
            </label> */}
        </>
    )
}

export default Settings
