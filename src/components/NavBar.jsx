import { Logout, Login } from "@mui/icons-material";
import { Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import logo from "../assets/logo.png"

export default function NavBar( props ){
    const { current, items = [], onLogin, onLogout } = props

    return(
        <Grid container 
            style={{
                padding: '20px 30px',
                background: 'linear-gradient(-90deg, #252570, #6466cd)',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: '0 1px 10px black',
                justifyContent: 'space-between'
            }}>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={1} style={{ display:'flex', alignItems:'center' }}>
                        <img src={logo} alt='' width={100}/>
                    </Grid>
                    <Grid item xs={4} style={{ display:'flex', alignItems:'center' }}>
                        <Typography component='h3' style={{ fontSize:'1.6rem', fontWeight:'bold' }}>Indicadores Prospectivos</Typography>
                    </Grid>
                    <Grid item xs={7} style={{ display:'flex', alignItems:'center' }}>
                        <List style={{display:'flex', flexDirection:'row', padding: 0}}>
                            { items.map( item => ( 
                                <ListItem key={item.label} style={{ padding:'10px', width:'fit-content' }}>
                                    <ListItemButton style={{padding:0}} onClick={item.action}>
                                        <ListItemText 
                                            primary={
                                                <Typography style={{fontSize:'1.4rem'}}>{item.label}</Typography>
                                            }></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} style={{ display:'flex', alignItems:'center' }}>
                { current ? (<span> {current} <IconButton onClick={onLogout}><Logout style={{color:'#fff'}} /></IconButton>
                    </span>):<IconButton onClick={onLogin}><Login style={{color:'#fff'}} /></IconButton> }
            </Grid>
        </Grid>
    )
}