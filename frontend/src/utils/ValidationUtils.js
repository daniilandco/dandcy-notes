const DISPLAY_FIELD_MAX_LENGTH = 40
const EDIT_TITLE_MAX_LENGTH = 45
const EDIT_CONTENT_MAX_LENGTH = 1500
const CONTENT_ROW_LIMIT = 30

class ValidationUtils {
    static get DISPLAY_FIELD_MAX_LENGTH() {
        return DISPLAY_FIELD_MAX_LENGTH
    }

    static get EDIT_TITLE_MAX_LENGTH() {
        return EDIT_TITLE_MAX_LENGTH
    }

    static get EDIT_CONTENT_MAX_LENGTH() {
        return EDIT_CONTENT_MAX_LENGTH
    }

    static get CONTENT_ROW_LIMIT() {
        return CONTENT_ROW_LIMIT
    }

    static prettyFieldFormat(text) {
        let firstLine = text.trim().split('\n')[0]
        let sliced = firstLine.slice(0, DISPLAY_FIELD_MAX_LENGTH)
        if (firstLine.length > DISPLAY_FIELD_MAX_LENGTH) {
            return sliced.trim() + '...'
        }
        return sliced
    }

    static prettyDateFormat(date) {
        const toFormat = new Date(date)
        return toFormat.toLocaleDateString() + ' ' + toFormat.toLocaleTimeString()
    }

    static validateTitleField(title) {
        if (!title || title.isEmpty) {
            throw new Error('Title cannot be empty')
        }
    }

    static validateContentField(content) {
        if (!content || content.isEmpty) {
            throw new Error('Content cannot be empty')
        }
    }

}

export default ValidationUtils