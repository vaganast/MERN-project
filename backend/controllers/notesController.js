const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc get all notes
// @route GET /notes
// @access private
const getAllNotes = asyncHandler(async (req, res) => {
    //get notes from mongoDB
    const notes = await Note.find().lean()

    //if no notes
    if(!notes?.length) {
        return res.status(400).json({ message: 'No notes found'})
    }

    // Add username to each note before sending the response 
    // Promise.all with map() link: https://youtu.be/4lqJBBEpjRE 
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username }
    }))

    res.json(notesWithUser)
})

// @desc create new note
// @route POST /notes
// @access private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    //confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required'})
    }     

     // Check for duplicate title
     const duplicate = await Note.findOne({ title }).lean().exec()

     if (duplicate) {
         return res.status(409).json({ message: 'Duplicate note title' })
     }

    //Create and store new note
    const note = await Note.create({ user, title, text })

    if (note) { //created
        res.status(201).json({ message: `New note ${title} created`})
    } else {
        res.status(400).json({ message: 'Invalid note data received'})
    }
})

// @desc update a note
// @route PATCH /notes
// @access private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    //confirm data
    if (!id || !user || !title || text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required'})
    }     

    //confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found'})
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json({ message: `${updatedNote.title} updated`})
})

// @desc delete a note
// @route DELETE /notes
// @access private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    //Confir data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required'})
    }
    
    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found'})
    }

    const result = await note.deleteOne()

    const reply = `Note with ${result.title} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}