import { NoteModels } from "../Models/NotesModels.js"

export const GetNote = async (req, res) => {
    const getNotes = await NoteModels.find()
    if (!getNotes) return res.status(400).json({ success: false, message: 'No notes present' })
    res.status(200).json({ success: true, message: getNotes })
}

export const addNotes = async (req, res) => {
    const { title, content } = req.body;
    const addedNote = await NoteModels.create({ title, content })
    res.status(201).json({ success: true, message: addedNote })
}

export const editNotes = async (req, res) => {
    const { title, content } = req.body;
    const editedNote = await NoteModels.findByIdAndUpdate(req.params.id, { title, content })
    res.status(200).json({ success: true, message: editedNote })

}

export const delNotes = async (req, res) => {
    const deledNote = await NoteModels.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: 'Note deleted successful' })

}

