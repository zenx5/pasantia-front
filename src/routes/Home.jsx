import { Box, Grid, Typography } from '@mui/material'
import images from '../assets/images.jpeg'
import pros from '../assets/props.jpg'

export default function Home(){
    return(
        <Box style={{
            height: '100vh',
            padding: '20px'
        }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography style={{fontSize:'50px', fontWeight:'bold', textAlign:'center'}}>Indicadores</Typography>
                </Grid>
                <Grid item xs={3}>
                    <img src={images} width={350} />
                </Grid>
                <Grid item xs={9}>
                    <Typography style={{margin:'10px', fontSize: '25px'}}>Un indicador de gestión es una variable cuantitativa cuya finalidad es brindar información acerca del grado de cumplimiento de una meta de gestión. </Typography>
                    <Typography style={{margin:'10px', fontSize: '25px'}}>Al medir el progreso hacia el logro de estas metas, funciona como una “señal de alerta” que muestra si se está trabajando en la senda correcta de acuerdo con los resultados planificados.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{fontSize:'50px', fontWeight:'bold', textAlign:'center'}}>Metodos Prospectivos</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography style={{margin:'10px', fontSize: '25px'}}>Para pensar en largo plazo no existe un solo camino, un único modo. Son muchas las técnicas que podrían utilizarse en la construcción de escenarios posibles.</Typography>
                    <Typography style={{margin:'10px', fontSize: '25px'}}>Por ello no importa qué herramienta sea utilizada, sino qué aportes pueden obtenerse gracias a la prospectiva.</Typography>
                </Grid>
                <Grid item xs={3}>
                    <img src={pros} width={350} />
                </Grid>
            </Grid>
            
        </Box>
    )
}