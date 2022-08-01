import { useEffect } from "react";
import { useRef } from "react";
import ColorPicker from '../../components/ColorPicker';

const ThemeEditor = ({colors}) => {
    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);
    const backgroundRef = useRef(null);
    const textRef = useRef(null);

    
    useEffect(() => {
        const editedTheme = {
            primary: primaryRef.current.value,
            secondary: secondaryRef.current.value,
            background: backgroundRef.current.value,
            text: textRef.current.value,
        }
        console.log(editedTheme)
    }, [])


    const style = {
        "display": "inline-flex",
        "gap": "20px",
        "backgroundColor": "#fff",
        "padding": "20px",
        "margin": "10px 0",
        "borderRadius": "10px"
    }

    return (
        <div style={style}>
            <ColorPicker classes={['color', 'primary', 'reset']} colorValue={colors.primary} refValue={primaryRef} onChange={console.log('test')}/>
            <ColorPicker classes={['color', 'secondary', 'reset']} colorValue={colors.secondary} refValue={secondaryRef}/>
            <ColorPicker classes={['color', 'background', 'reset']} colorValue={colors.background} refValue={backgroundRef}/>
            <ColorPicker classes={['color', 'text', 'reset']} colorValue={colors.text} refValue={textRef}/>
        </div>
    )
}

export default ThemeEditor