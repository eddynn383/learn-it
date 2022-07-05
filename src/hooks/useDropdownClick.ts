import useDropdownContext from './useDropdownContext';

const useDropdownClick = (eventKey:string | number, onClick: (event: any) => void) => {
    const { onToggle, activeEventKey } = useDropdownContext();
    return (event:any) => {

        onToggle(eventKey === activeEventKey ? null : eventKey);

        if (onClick) {
            onClick(event);
        }
    };
}; 

export default useDropdownClick;