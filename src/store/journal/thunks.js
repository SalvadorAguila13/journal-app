import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

// Cargar notas de Firebase (Que la informacion no se pierda al cargar la pagina, que los datos que tengamos en Firebase Data Base, se muestren en pantalla)
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    
    // Función realizada en la carpeta src/helpers (loadNotes)
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes))
  };
};


// Guardar cambios de la nota activa.
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())
    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    const noteToFireStore = {...note}
    // Borrar una propiedad de la nota
    delete noteToFireStore.id;


    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, {merge: true});

    dispatch(updateNote(note))
  }
}


// Subir o cargar imagenes en la aplicación
export const startUpLoadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())
    
    // await fileUpload(files)
    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const phorosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(phorosUrls))
  }
}

export const startDeletingNote = () => {
  return async( dispatch, getState) => {

      const { uid } = getState().auth;
      const { active: note } = getState().journal;

      const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
      await deleteDoc( docRef );

      dispatch( deleteNoteById(note.id) );

  }
}