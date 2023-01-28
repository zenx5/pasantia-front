import { 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
} from "@mui/material";

import {
    Face
} from "@mui/icons-material"


export default function LatBar( props ){
    const { items } = props

    return(
        <List style={{minHeight:'100vh'}}>
            {items.map( item => (<ListItem key={item.label}>
                <ListItemButton disabled={item.disabled} onClick={item.action}>
                    <ListItemIcon>
                        <Face  sx={{ color: '#fff' }}  />
                    </ListItemIcon>
                    <ListItemText primary={item.label}></ListItemText>
                </ListItemButton>
            </ListItem>))}
        </List>
    )
}