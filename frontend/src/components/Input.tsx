import { FC } from 'react';
import { addClass, classModifier } from '../functions/utils';
import Label from '../components/Label';
import '../assets/design/input.scss';

export interface IPropsInput {
    outerRef?: any;
    type?: string;
    size?: any;
    placeholder?: string;
    classes: Array<string>;
    id?: string;
    label?: JSX.Element|JSX.Element[];
    iconBefore?: any;
    iconAfter?: any;
}

const Input:FC<IPropsInput> = ({ outerRef, type="text", size="medium", placeholder, classes, id, label, iconBefore, iconAfter }) => {
    const innerProps = {
        id,
        type,
        size,
        placeholder,
        ref: outerRef
    }

    return (
        <div className={addClass(classModifier('input-group', classes))}>
            {label}
            <div className={addClass(classModifier('input', classes))}>
                {iconBefore}
                {
                    <input {...innerProps} />
                }
                {iconAfter}
            </div>
        </div>
    )
}

export default Input    