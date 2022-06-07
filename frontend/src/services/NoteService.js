import $api from "../http"
import AuthService from "./AuthService";

class NoteService {
    static async getAllNotes() {
        const response = await $api.get(`admin/notes/all/`)
        return await response.data
    }

    static async getUserNotes() {
        const response = await $api.get(`notes/all/`)
        return await response.data
    }

    static async getNoteById(noteID) {
        const response = await $api.get(`notes/${noteID}/`)
        return await response.data
    }

    static async updateNote(note) {
        const response = await $api.patch(`notes/${note.id}/update/`, {
                ...note
            }
        )
        return await response.data
    }

    static async createNote(note) {
        const response = await $api.post(`notes/create/`, {
                ...note, 'user': AuthService.getCurrentUserID()
            }
        )
        return await response.data
    }

    static async deleteNote(noteID) {
        const response = await $api.delete(`notes/${noteID}/delete/`)
        return await response.data
    }

    static async deleteNotes(noteIDs) {
        const response = await $api.post(`notes/delete/`, {ids: noteIDs})
        return await response.data
    }

}


export default NoteService