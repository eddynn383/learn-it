import { useMemo, useState, useLayoutEffect, useCallback } from 'react';
import AccordionContext from '../../context/AccordionContext';
import Collapse from './Collapse';
import Toggle from './Toggle';
import './style.scss';
import { IPropsAccordion } from './interface';

const useEventKey = (eventKey: string | number, onToggle: (eventKey: string | number) => void) => {
    const [activeEventKey, setActiveEventKey] = useState<any>(eventKey);
  
    useLayoutEffect(() => {
        setActiveEventKey(eventKey);
    }, [eventKey, onToggle]);
  
    return [activeEventKey, setActiveEventKey];
}

const Accordion = ({element: Component, activeEventKey, onToggle, children, ...otherProps}:IPropsAccordion) => {
    const [eventKey, setEventKey] = useEventKey(activeEventKey, onToggle)

    const handleToggle = useCallback((eventKey:string | number) => {
        if (activeEventKey !== undefined) {
            onToggle(eventKey);
            return;
        }
        setEventKey(eventKey);
    }, [activeEventKey, onToggle, setEventKey])

    const context = useMemo(() => {
        return {
            activeEventKey: eventKey,
            onToggle: handleToggle
        }
    }, [eventKey, handleToggle]);

    return (
        <AccordionContext.Provider value={context}>
            <Component {...otherProps}>{children}</Component>
        </AccordionContext.Provider>
    );
}
  
Accordion.defaultProps = {
    element: 'accordion'
};
  
Accordion.Toggle = Toggle;
Accordion.Collapse = Collapse;

export default Accordion;