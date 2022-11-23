import { Grid, Typography } from '@mui/material'

export default function Contact(){

    return(<Grid container>
        <Grid item xs={12}>
            <Typography component='h1' style={{ fontSize:'4rem', fontWeight:'bold', textAlign:'center', margin:'20px' }}>Contáctanos</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography component='div' style={{ textAlign:'center', fontSize:'1.2rem' }}>Si quieres comunicarte con nosotros, puedes hacerlo a cualquiera de nuestras opciones de contacto</Typography>
            <Typography component='div' style={{ textAlign:'center', fontSize:'1.2rem' }}>Estamos listos para responderte</Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign:'center', marginTop:'4rem' }}>
            <Typography>Puerto Ordaz, Estado Bolivar</Typography>
            <Typography>Telefonos: </Typography>
            <Typography>Correo Electronico: </Typography>
        </Grid>
    </Grid>)
}