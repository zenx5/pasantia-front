import { Box, Grid, Typography} from '@mui/material'
import metodos from '../assets/metodos.png'
import monitor from '../assets/monitor.png'
import images from '../assets/images.jpeg'
import pros from '../assets/props.jpg'
import { Note } from "../components"

export default function Home(){
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
                <Note 
                    title='Prospectiva'
                    content='Prospectiva es un proceso sistemático, participativo, generador de conocimiento sobre el futuro y creador de visiones a largo-medio plazo, dirigido a apoyar la toma de decisiones presente y a movilizar acciones conjuntas'
                    src={monitor}
                    />
                <Note 
                    title='Métodos Prospectivos'
                    content='Para pensar en largo plazo no existe un solo camino, un único modo. Son muchas las técnicas que podrían utilizarse en la construcción de escenarios posibles. Por ello no importa qué herramienta sea utilizada, sino qué aportes pueden obtenerse gracias a la prospectiva.'
                    src={metodos}
                    reverse
                    />

            </Grid>
            
        </Box>
    )
}