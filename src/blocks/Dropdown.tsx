import { FC } from "react";
import useToggle from '../hooks/useToggle';
import Button, {IPropsButton} from "../components/Button";
import { addClass, addActive, classModifier } from '../functions/utils';
import '../assets/design/dropdown.scss';

export interface IPropsDropdown {
    classes: Array<string>;
    dropdownTrigger: IPropsButton;
    dropdownContent: any;
}

const Dropdown:FC<IPropsDropdown> = ({classes, dropdownTrigger, dropdownContent}) => {
    const [active, toggleActive] = useToggle(false)
    
    const handleButton = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        toggleActive(!active)
    }

    const newClasses = classModifier('dropdown', classes)
    const withActive = addActive(newClasses, 'active', active)

    return (
        <div className={addClass(withActive)}>
            <Button {...dropdownTrigger} onClick={handleButton} />
            {active && <div className="content">{dropdownContent}</div>}
        </div>
    )
}

export default Dropdown