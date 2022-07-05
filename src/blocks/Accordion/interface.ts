export interface IPropsAccordion {
    element: any;
    activeEventKey: any; 
    onToggle: any;
    children?: JSX.Element | JSX.Element[];
}

export interface IPropsToggle extends IPropsAccordion {
    eventKey: any;
    onClick: () => void;
}

export interface IPropsCollapse extends IPropsAccordion {
    eventKey: any;
}
