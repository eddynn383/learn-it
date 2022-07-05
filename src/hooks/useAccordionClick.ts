import useAccordionContext from './useAccordionContext';

const useAccordionClick = (eventKey:string | number, onClick: (event: any) => void) => {
    const { onToggle, activeEventKey } = useAccordionContext();
    return (event:any) => {

        onToggle(eventKey === activeEventKey ? null : eventKey);

        if (onClick) {
            onClick(event);
        }
    };
}; 

export default useAccordionClick;