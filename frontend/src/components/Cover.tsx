import { FC } from 'react';
import { addClass, classModifier } from '../functions/utils';
import '../assets/design/cover.scss';

interface IPropsCover {
    classes: Array<string>;
    size?: "small" | "medium" | "large";
    type?: "circle" | "square";
    url: string;
    alt: string;
}

const Cover:FC<IPropsCover> = ({url, alt, classes, type="circle", size="medium" }) => {

    return (
        <div className={addClass(classModifier('cover', [...classes, type, size]))}>
            <img src={url} alt={alt} />
        </div>
    )
}

export default Cover