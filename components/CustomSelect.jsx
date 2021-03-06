import Select from "react-select";

const styles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#2b2c4a',
        borderWidth: '0',
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: '#2b2c4a'
    }),
    option: (provided, state) => ({
        ...provided,
        color: '#fff',
        backgroundColor: '',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#23243c'
        }
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: '#1c1c2f',
        padding: '0.2rem 0.3rem',
        borderRadius: '0.25rem'
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        color: '#fff',
        marginRight: '0.2rem'
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: '#fff',
        padding: '0.25rem',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#F87171'
        }
    }),
    clearIndicator: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        color: '#9CA3AF',
        '&:hover': {
            color: '#fff'
        }
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        color: '#9CA3AF',
        '&:hover': {
            color: '#fff'
        },
        borderWidth: '0'
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: '#374151',
        width: '2px',
    })
}

export default function CustomSelect(props) {
    return (
        <Select styles={styles} {...props}/>
    )
}