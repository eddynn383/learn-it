import './style.scss'

const Switch = ({from, to, value, checked, onChange}) => {
    return (
        <>
            <span>{from}</span>
            <label className="switch">
                <input type="checkbox" onChange={onChange} value={value} checked={checked}/>
                <span className="slider round"></span>
            </label>
            <span>{to}</span>
        </>
    )
}

export default Switch;