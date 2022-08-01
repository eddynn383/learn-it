import { FC, useEffect, useRef, useState } from "react";
import useToggle from '../hooks/useToggle';
import Button from "../components/Button";
import { IPropsButton } from "../components/Button/interface";
import { addClass, addActive, classModifier } from '../functions/utils';
import '../assets/design/dropdown.scss';

export interface IPropsDropdown {
    classes: Array<string>;
    dropdownTrigger: IPropsButton;
    dropdownContent: any;
}

const Dropdown:FC<IPropsDropdown> = ({classes, dropdownTrigger, dropdownContent}) => {
    // const [active, toggleActive] = useToggle(false)
    const ref = useRef<any>()
    const [open, setOpen] = useState<Boolean>(false)

    useEffect(() => {
        const outsideClickCheck = (e: any):void => {
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", outsideClickCheck)

        return () => {
            document.removeEventListener("mousedown", outsideClickCheck)
        }
    }, [open])
    
    // const handleButton = (e: React.FormEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     toggleActive(!active)
    // }

    const newClasses = classModifier('dropdown', classes)
    const withActive = addActive(newClasses, 'active', open)

    return (
        <div className={addClass(withActive)}>
            <Button {...dropdownTrigger} onClick={() => setOpen(!open)} />
            {open && <div className="content" ref={ref}>{dropdownContent}</div>}
        </div>
    )
}

export default Dropdown