import { FC } from 'react';
import Label from './Label';
import Text from './Text';
import { addClass, classModifier } from '../functions/utils';
import '../assets/design/checkbox.scss';

interface IPropsCheckbox {
    label: string;
    checkmark?: any;
    classes: string[];
    id?: string;
    type: 'checkbox' | 'radiobox';
    checked?: boolean;
    onClick?: (e: any) => any;
}

const Checkbox:FC<IPropsCheckbox> = ({label, checkmark, classes, id, type, checked, onClick}) => {
    const innerProps = {
        id,
        type,
        checked,
        onClick
    }
    return (
        <div className={addClass(classModifier('input', classes))}>
            <Label>
                <input {...innerProps} />
                <span className="checkmark">{checkmark}</span>
                <Text inline={true}>{label}</Text>
            </Label>
        </div>
    )
}

export default Checkbox