import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";


export default function NavBar( props ){
    const { items = [] } = props

    return(
        <Grid container 
            style={{
                padding: '20px 30px',
                background: 'linear-gradient(-90deg, #252570, #6466cd)',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: '0 1px 10px black'
            }}>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={3}>Indicadores Prospectivos</Grid>
                    <Grid item xs={9}>
                        <List style={{display:'flex', flexDirection:'row', padding: 0}}>
                            { items.map( item => ( 
                                <ListItem key={item.label} style={{padding:0}}>
                                    <ListItemButton style={{padding:0}} onClick={item.action}>
                                        <ListItemText primary={item.label}></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}>Login</Grid>
        </Grid>
    )
}