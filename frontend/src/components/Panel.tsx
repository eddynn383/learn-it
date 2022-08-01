import { FC } from 'react';
import '../assets/design/panel.scss';

interface IProps {
    children: any;
    classes?: string;
    style?: Object;
}

const Panel:FC<IProps> = ({children, classes, style}) => {
    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )
}

export default Panel