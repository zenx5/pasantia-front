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
        <List>
            {items.map( item => (<ListItem key={item.label}>
                <ListItemButton onClick={item.action}>
                    <ListItemIcon>
                        <Face  sx={{ color: '#fff' }}  />
                    </ListItemIcon>
                    <ListItemText primary={item.label}></ListItemText>
                </ListItemButton>
            </ListItem>))}
        </List>
    )
}