import { useState } from 'react';

const useToggle = (defaultValue: boolean) => {
    const [value, setValue] = useState(defaultValue)

    const toggleValue = (value:boolean) => {
        setValue(currentValue => value ? value : !currentValue)

        // console.log(currentValue)
    }

    return [value, toggleValue] as const
}

export default useToggle;