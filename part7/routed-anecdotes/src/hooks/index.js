import { useState } from "react"

export const useField = (name) => {
    const [ value, setValue ] = useState('')

    const reset = () => {
        setValue('')
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {
        name,
        value,
        onChange,
        reset
    }
}