import { FC } from 'react';
import '../assets/design/label.scss';

interface IProps {
    children: any;
    htmlFor?: string;
}

const Label:FC<IProps> = ({children, htmlFor}) => {
    return (
        <label htmlFor={htmlFor}>{children}</label>
    )
}

export default Label