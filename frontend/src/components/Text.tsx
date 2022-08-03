import { FC } from 'react';

interface IPropsText {
    children: any;
    inline: boolean;
}

const Text:FC<IPropsText> = ({children, inline}) => {
    return (
        inline ? <span>{children}</span> : <p>{children}</p>
    )
}

export default Text