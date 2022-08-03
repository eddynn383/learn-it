import { FC } from 'react';
import { addClass, classModifier } from '../functions/utils';
import '../assets/design/logo.scss';

interface IPropsLogo {
    url: string;
    alt: string;
    classes: Array<string>;
    style?: Object;
}

const Logo:FC<IPropsLogo> = ({classes, url, alt, style}) => {
    const innerProps = {
        src: url,
        alt,
        style
    }
    
    return (
        <>
            <div className={addClass(classModifier('logo', classes))}>
                <img {...innerProps} />
            </div>
        </>
    )
}

export default Logo