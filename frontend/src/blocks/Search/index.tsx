import { FC } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
// import Icon from '../../components/Icon';
import { addClass, classModifier } from '../../functions/utils';
import './style.scss';

import { IPropsSearch } from './interface'

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