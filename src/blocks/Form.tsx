import { FC } from 'react';
import { addClass, classModifier } from '../functions/utils';

interface IPropsForm {
    classes: Array<string>;
    style?: Object | undefined;
    onSubmit?: (e:any) => void;
    children: any;
}

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