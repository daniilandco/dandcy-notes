import React from "react"
import {Link} from "react-router-dom";
import ValidationUtils from "../utils/ValidationUtils";

const Note = ({note}) => {

    return (
        <Link to={`/notes/${note.id}`}>
            <div className="notes-list-item">
                <div>{ValidationUtils.prettyFieldFormat(note?.title)}</div>
                <p><span>{ValidationUtils.prettyFieldFormat(note?.content)}</span></p>
                <p><span>created: {ValidationUtils.prettyDateFormat(note?.created_at)}</span></p>
                <p><span>updated: {ValidationUtils.prettyDateFormat(note?.updated_at)}</span></p>
            </div>

        </Link>
    )
}

export default Note