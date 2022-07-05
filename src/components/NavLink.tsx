import { FC } from 'react';
import Text from './Text';
import Icon from './Icon';
import { Link, useMatch, useResolvedPath, } from 'react-router-dom';
import { addActive, addClass, classModifier } from '../functions/utils';

import '../assets/design/link.scss';

interface IPropsNavLink {
    to: string;
    classes: Array<string>;
    iconBefore?: string;
    text?: string;
    iconAfter?: string;
}

const NavLink:FC<IPropsNavLink> = ({to, classes, iconBefore, text, iconAfter}) => {
    const resolved = useResolvedPath(to)
    const match = useMatch({ path: resolved.pathname, end: true })
    const newClasses = classModifier('link', classes)
    // console.log(newClasses)
    const withActive = addActive(newClasses, 'active', match)
    // console.log(withActive)
    return (
        <Link to={to} className={addClass(withActive)} >
            {iconBefore && <Icon classes={['link', 'before']} icon={iconBefore} />}
            {text && <Text inline={true}>{text}</Text>}
            {iconAfter && <Icon classes={['link', 'after']} icon={iconAfter } />}
        </Link>
    )
}

export default NavLink