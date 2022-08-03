import { useMemo, useState, useLayoutEffect, useCallback } from 'react';
import DropdownContext from '../../context/DropdownContext';
import Selector from './Selector';
import Options from './Options';
import { IPropsDropdown } from './interface';

const useEventKey = (eventKey: string | number, onToggle: (eventKey: string | number) => void) => {
    const [activeEventKey, setActiveEventKey] = useState<any>(eventKey);
  
    useLayoutEffect(() => {
        setActiveEventKey(eventKey);
    }, [eventKey, onToggle]);
  
    return [activeEventKey, setActiveEventKey];
}

const Dropdown = ({element: Component, activeEventKey, onToggle, children, ...otherProps}:IPropsDropdown) => {
    const [eventKey, setEventKey] = useEventKey(activeEventKey, onToggle)
    
    const handleToggle = useCallback((eventKey: string | number) => {
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
        <DropdownContext.Provider value={context}>
            <Component {...otherProps}>{children}</Component>
        </DropdownContext.Provider>
    )
}

Dropdown.defaultProps = {
    element: 'dropdown'
};
  
Dropdown.Selector = Selector;
Dropdown.Options = Options;

export default Dropdown