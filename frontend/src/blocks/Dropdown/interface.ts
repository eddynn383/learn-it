export interface IPropsDropdown {
    element: any;
    activeEventKey: any; 
    onToggle: any;
    children?: JSX.Element | JSX.Element[];
}

export interface IPropsSelector extends IPropsDropdown {
    eventKey: any;
    onClick: () => void;
}

export interface IPropsOptions extends IPropsDropdown {
    eventKey: any;
}