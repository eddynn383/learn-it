import useDropdownContext from '../../../hooks/useDropdownContext';
import { IPropsOptions } from '../interface';

const Options = ({element: Component, eventKey, children, ...otherProps}:IPropsOptions) => {

    const { activeEventKey } = useDropdownContext();

    return activeEventKey === eventKey ? (
        <Component {...otherProps}>{children}</Component>
    ) : null
}

export default Options;