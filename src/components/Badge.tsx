import { FC } from 'react';
import { addClass, classModifier } from '../functions/utils';
import '../assets/design/badge.scss'

interface IPropsBadge {
    value: number;
    maxValue?: number;
    size?: "small" | "medium" | "large";
    type?: "info" | "warning" | "danger";
    classes: Array<string>;
    title?: string;
}

const Badge: FC<IPropsBadge> = ({value, maxValue, size="medium", type="info", classes, title}) => {
    
    const newClasses = classModifier('badge', [...classes, size, type])
    const text: string = maxValue ? (value > maxValue ? `${maxValue}+` : `${value}`) : `${value}`

    const outerProps = {
        className: addClass(newClasses, size),
        maxvalue: maxValue,
        size,
        type,
        title
    }

    if (value <= 0) {
        return null;
    }

    return (
        <span {...outerProps}>{text}</span>
    )
}

export default Badge