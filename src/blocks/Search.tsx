import { FC } from 'react';
import Input, { IPropsInput } from '../components/Input';
import Button, { IPropsButton } from '../components/Button';
import Icon from '../components/Icon';
import { addClass, classModifier } from '../functions/utils';
import '../assets/design/search.scss';

interface IPropsSearch {
    classes: Array<string>;
    input: IPropsInput;
    button: IPropsButton;
}

const Search:FC<IPropsSearch> = ({classes, input, button}) => {
    // console.log(o)
    // const innerProps = {
    //     input: {
    //         class: o.input.class,
    //         id: o.input.id,
    //         type: o.input.type,
    //         'data-size': o.input.size,
    //         placeholder: o.input.placeholder,
    //     },
    //     button: {
    //         class: o.button.class,
    //         type: 'button',
    //         iconBefore: <Icon classes={[o.button.iconBefore]} icon={o.button.iconBefore} />
    //     }
    // }
    return (
        <div className={addClass(classModifier('module', classes))}>        
            <Input {...input} />
            <Button {...button} />
        </div>
    )
}

export default Search