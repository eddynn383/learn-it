import { FC, useState } from 'react';
import { IPropsColorPicker } from './interface';
import { classModifier, addClass } from '../../functions/utils';

import './style.scss'

const ColorPicker:FC<IPropsColorPicker> = ({classes, id, colorValue, refValue}) => {
    const [ color, setColor ] = useState(colorValue)
    const attrs = {
        colorSelector: {
            className: addClass(classModifier('input', ['color-selector', 'reset', ...classes])),
            id,
            value: color,
            ref: refValue,
            onChange: (e:any) => {setColor(e.target.value)}
        },
        colorName: {
            className: addClass(classModifier('input', ['color-name', 'reset', ...classes])),
            id,
            value: color,
            onChange: (e:any) => {setColor(e.target.value)}
        }
    }
    
    return (
        <div className="color-picker">
            <input type="color" {...attrs.colorSelector} />
            <input type="text" {...attrs.colorName}/>
        </div>
    )
}

export default ColorPicker