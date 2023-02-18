import React from 'react'
import { Link } from 'react-router-dom'


const AddButton = () => {
    return (
        <Link to="/note/new" className='floating-button'>

            <i className='bi bi-plus'></i>

        </Link >
    )
}

export default AddButton
