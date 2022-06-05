import React from 'react'
import {ReactComponent as AddButtonIcon} from "../assets/add-btn.svg";
import {Link} from "react-router-dom";

const AddButton = () => {

    return (
        <Link to="/notes/create" className="floating-button">
            <AddButtonIcon/>
        </Link>
    )
}

export default AddButton