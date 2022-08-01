import { FC } from 'react';
import { addClass, classModifier } from '../../functions/utils';

import { IPropsForm } from './interface';

const Form:FC<IPropsForm> = ({classes, style, onSubmit, children}) => {
    const outerProps = {
        className: addClass(classModifier('form', classes)),
        style,
        onSubmit
    }
    return (
        <form {...outerProps}>
            {children}
        </form>
    )
}

export default Form