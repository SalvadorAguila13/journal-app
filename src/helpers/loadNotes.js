import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async(uid = '') => {
    if(!uid) throw new Error('El UID del usuario no existe')

    // Realizar la referencia de la coleccion de datos que se tiene en Firebase, en donde se importa "collection" para hacer referencia de la información del usuario que solicitaremos los datos y posteriormente se le agrega la DB y la ruta.
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    // Para solicitar los datos se usa el metodo getDocs de Firebase y se le pasa el Query (collectionRef)
    // (docs es la referencia de los datos que tiene en Firebase)
    const docs = await getDocs(collectionRef)
    // console.log(docs)

    // Llamar la funcion data de Firebase que se encuentra en cada documento.
    const notes = []
    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()})});
    // console.log(notes)
    return notes;
}


