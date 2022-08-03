import { FC } from 'react';
import { classModifier, addClass } from '../../functions/utils';
import './style.scss';


import { IPropsButton } from './interface';

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