import useSelectorClick from '../../../hooks/useAccordionClick';
import { IPropsSelector } from '../interface';

const Selector = ({element: Component, eventKey, onClick, children, ...otherProps}:IPropsSelector) => {
    const selectorClick = useSelectorClick(eventKey, onClick);

    return (
        <Component onClick={selectorClick} {...otherProps}>
            {children}
        </Component>
      );
}

export default Selector;