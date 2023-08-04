import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

const SidebarItem = ({note, imgUrls = []}) => {

    const dispatch = useDispatch()


    // Activar la nota respectiva en la que se de click (#2).
    const handleClickActiveNote = () => {
        dispatch(setActiveNote({...note, imgUrls}))
    }

    // Función que limita la cantidad de texto que debe contener el body del sidebar (#1)
    const newTitle = useMemo(() => {
        return note.title.length > 17 
                    ? note.title.substring(0,17) + '...'
                    : note.title
    }, [note.title])

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={handleClickActiveNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ note.body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}

export default SidebarItem
