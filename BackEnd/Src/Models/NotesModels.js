import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }

}, { timestamps: true })

export const NoteModels = mongoose.model('note', noteSchema)