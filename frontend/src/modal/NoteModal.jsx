import React, {useEffect, useState} from "react"
import NoteService from "../services/NoteService"
import {useNavigate, useParams} from "react-router-dom"
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg"
import ValidationUtils from "../utils/ValidationUtils";

const Note = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [note, setNote] = useState(null)
    const [error, setError] = useState('')
    let paramId = params.id

    useEffect(() => {
        initNote()
    }, [paramId])


    const initNote = async () => {
        if (isNaN(paramId)) {
            return
        }
        const note = await NoteService.getNoteById(paramId)
        setNote(note)
    }

    const backToNotes = () => {
        try {
            ValidationUtils.validateTitleField(note?.title)
            ValidationUtils.validateContentField(note?.content)
        } catch (e) {
            setError(e.message)
            return
        }

        if (paramId === 'create') {
            createNote()
        } else {
            updateNote()
        }
        navigate('/notes')
    }

    const updateNote = async () => {
        await NoteService.updateNote(note)
    }

    const deleteNote = async () => {
        await NoteService.deleteNote(paramId)
        navigate('/notes')
    }

    const createNote = async () => {
        await NoteService.createNote(note)
        navigate('/notes')
    }

    const onTitleChange = (e) => {
        setNote(note => {
            return {...note, 'title': e.target.value}
        })
    }

    const onContentChange = (e) => {
        setNote(note => ({...note, 'content': e.target.value}))
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={backToNotes}/>
                </h3>
                <span className="validation-error">{error}</span>
                {paramId !== 'create' ? (
                    <button onClick={deleteNote}> Delete </button>
                ) : (
                    <button onClick={backToNotes}> Create </button>
                )
                }

            </div>
            <input maxLength={ValidationUtils.EDIT_TITLE_MAX_LENGTH} onChange={onTitleChange} className="textarea-title"
                   value={note?.title}/>
            <textarea maxLength={ValidationUtils.EDIT_CONTENT_MAX_LENGTH} onChange={onContentChange}
                      className="textarea-content" value={note?.content}/>
        </div>
    )
}

export default Note