import React, {useEffect, useState} from 'react'
import NoteService from "../services/NoteService";
import Note from "../components/Note";
import AddButton from "../components/AddButton";
import {useAuth} from "../contexts/AuthContext";

const NotesPage = () => {

    const [notes, setNotes] = useState([])
    const {currentUser} = useAuth()

    useEffect(() => {
        initNotes()
    }, [])

    const initNotes = async () => {
        let notes
        if (currentUser?.is_superuser) {
            notes = await NoteService.getAllNotes()
        } else {
            notes = await NoteService.getUserNotes()
        }

        setNotes(await notes)
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                    <Note note={note} key={index}/>
                ))}
            </div>
            <AddButton/>
        </div>
    )
}

export default NotesPage;