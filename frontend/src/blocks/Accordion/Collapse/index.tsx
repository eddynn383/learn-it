import useAccordionContext from '../../../hooks/useAccordionContext';
import { IPropsCollapse } from '../interface';

const Collapse = ({element: Component, eventKey, children, ...otherProps}:IPropsCollapse) => {

    const { activeEventKey } = useAccordionContext();

    return activeEventKey === eventKey ? (
        <Component {...otherProps}>{children}</Component>
    ) : null
}

export default Collapse;