import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { addClass, classModifier } from '../functions/utils';
import '../assets/design/icon.scss';

interface IPropsIcon {
    icon: string;
    classes: Array<string>;
    badge?: any;
    style?: Object;
}

const Icon:FC<IPropsIcon> = ({icon, classes, badge, style}) => {
    return (
        <span className={addClass(classModifier('icon', classes))} style={style} >
            {badge}
            <FontAwesomeIcon icon={fas[icon]} />
        </span>
    )
}

export default Icon
