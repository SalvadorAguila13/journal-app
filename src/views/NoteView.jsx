import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import ImageGallery from "../journal/components/ImageGallery"
import { useDispatch, useSelector } from "react-redux"
import useForm from "../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUpLoadingFiles } from "../store/journal/thunks"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

const NoteView = () => {

    const dispatch = useDispatch()
    const {active:note, messageSave, isSaving} = useSelector(state => state.journal)

    const {title, body, date, onInputChange, formState} = useForm(note)

    const dateString = useMemo(() => {
        const formatDate = new Date(date);
        return formatDate.toUTCString();
    }, [date])

    const fileInputRef = useRef()

    // Efecto que se usa para que este pendiente de los cambios respectivos a la nota activa
    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    // Efecto que muestra el mensaje cuando la nota ah sido actualizada. Mediante la libreria de SweetAlert2
    useEffect(() => {
        if(messageSave.length > 0 ){
            Swal.fire('Nota actualizada', messageSave, 'success')
        }
        }, [messageSave])
    
    
    const handleSaveNote = () => {
        dispatch(startSaveNote())
    }

    const handleFileInputChange = ({target}) => {
        if(target.files === 0) return;
        dispatch(startUpLoadingFiles(target.files))
    }

    const handleDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
        </Grid>

        <input 
        ref={fileInputRef}
        type="file" 
        multiple 
        onChange={handleFileInputChange}
        style={{display: 'none'}}
        />

        <IconButton onClick={ () => fileInputRef.current.click()} color="primary" disabled={isSaving}>
            <UploadOutlined/>
        </IconButton>
        
        <Grid item>
            <Button onClick={handleSaveNote} color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
            onClick={handleDelete}
            sx={{mt: 2}}
            color="error"
            >
                <DeleteOutline/>
                Delete
            </Button>
        </Grid>

        {/*Image gallery */}
        <ImageGallery images={note.imgUrls}/>

    </Grid>
  )
}

export default NoteView