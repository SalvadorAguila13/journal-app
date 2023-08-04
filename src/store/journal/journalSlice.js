import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null,
        // active: {
        //     id: '123456',
        //     title: '',
        //     body: '',
        //     date: 132465,
        //     imgUrls: [],
        // }
        
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.messageSave = ''
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSave = ''
        },
        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note;
            })
            // Mostrar mensaje de actualización.
            state.messageSave = `${action.payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imgUrls = [...state.active.imgUrls, ...action.payload];
            state.isSaving = false
        },
        clearNotesLogOut: (state) => {
            state.isSaving = false
            state.messageSave = ''
            state.notes = []
            state.active = null
        },
        deleteNoteById: (state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
})

export const { 
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updateNote,
    setPhotosToActiveNote, 
    deleteNoteById, 
    savingNewNote,
    clearNotesLogOut } = journalSlice.actions;

