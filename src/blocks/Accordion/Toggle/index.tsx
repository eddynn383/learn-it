import useAccordionContext from '../../../hooks/useAccordionContext';

import { IPropsToggle } from '../interface'

const useAccordionClick = (eventKey:string | number, onClick: (event: any) => void) => {
    const { onToggle, activeEventKey } = useAccordionContext();
    return (event:any) => {

        onToggle(eventKey === activeEventKey ? null : eventKey);

        if (onClick) {
            onClick(event);
        }
    };
}; 

const Toggle = ({element: Component, eventKey, onClick, children, ...otherProps}:IPropsToggle) => {
    const accordionClick = useAccordionClick(eventKey, onClick);

    return (
        <Component onClick={accordionClick} {...otherProps}>
            {children}
        </Component>
      );
}

export default Toggle;