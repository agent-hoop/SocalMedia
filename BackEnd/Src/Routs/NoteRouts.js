

import { Router } from "express"
import { GetNote, addNotes, delNotes, editNotes } from "../Controller/NoteController.js"
export const noteRoute = Router()

noteRoute.get('/', GetNote)
noteRoute.post('/', addNotes)
noteRoute.delete('/:id', delNotes)
noteRoute.put('/:id', editNotes)


