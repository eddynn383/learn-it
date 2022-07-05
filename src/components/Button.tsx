import { FC } from 'react';
import { classModifier, addClass } from '../functions/utils';
import '../assets/design/button.scss';

export interface IPropsButton {
    children?: any;
    classes: Array<string>;
    id?: string;
    size?: string;
    type?: any;
    theme?: string;
    title?: string;
    onClick?: (e: any) => void;
}

const Button:FC<IPropsButton> = ({ children, classes, id, size="medium", type="button", theme="primary", title, onClick}) => {

    const outerProps = {
        className: addClass(classModifier('button', [...classes, theme, size])),
        id,
        type,
        theme,
        size,
        title,
        onClick
    }

    return (
        <button {...outerProps}>
            {children}
        </button>
    )
}

export default Button