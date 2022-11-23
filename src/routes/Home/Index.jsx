import { Box, Grid, Typography} from '@mui/material'
import metodos from '../../assets/metodos.png'
import { Note } from "../../components"

export default function Index(){
    return(
        <Box style={{
            height: '100vh',
            padding: '20px'
        }}>
            <Grid container>
                <Note 
                    title='Indicadores Prospectivos'
                    content='Son variable cuantitativa que brindan información acerca del grado de cumplimiento de una meta. Al medir el progreso hacia el logro de estas metas, funciona como una señal que muestra si se está trabajando en la senda correcta de acuerdo con los resultados planificados. En este sentido, sirve para detectar posibles desvíos y corregirlos'
                    src={metodos}
                    reverse
                    />
               

            </Grid>
            
        </Box>
    )
}