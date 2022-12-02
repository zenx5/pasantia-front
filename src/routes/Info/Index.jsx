import { Box, Grid, Typography} from '@mui/material'
import metodos from '../../assets/metodos.png'
import monitor from '../../assets/monitor.png'
import images from '../../assets/images.jpeg'
import pros from '../../assets/props.jpg'
import { Note } from "../../components"

export default function Index(){
    return(
        <Box style={{
            padding: '20px'
        }}>
            <Grid container>
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
                <Note 
                    title='MICMAC'
                    content='El análisis estructural es una herramienta de estructuración de una reflexión colectiva. Ofrece la posibilidad de describir un sistema con ayuda de una matriz que relaciona todos sus elementos constitutivos'
                    />
                <Note 
                    title='MACTOR'
                    content='Método de análisis de juego de actores, Mactor busca valorar las relaciones de fuerza entre los actores y estudiar sus convergencias y divergencias con respecto a un cierto número de posturas y de objetivos asociados.'
                    reverse
                    />
                <Note 
                    title='MORPHOL'
                    content='El análisis morfológico tiende a explorar de manera sistemática los futuros posibles a partir del estudio de todas las combinaciones resultantes de la descomposición de un sistema. El objetivo del análisis morfológico evidencia la conducta de los nuevos productos en previsión tecnológica pero también la construcción de escenarios.'
                    />
                <Note 
                    title='SMIC PRO EXPERT'
                    content='Los métodos de impactos cruzados probabilistas vienen a determinar las probabilidades simples y condicionadas de hipótesis o eventos, así como las probabilidades de combinaciones de estos últimos, teniendo en cuenta las interacciones entre los eventos y/o hipótesis.'
                    reverse
                    />
                <Note 
                    title='MULTIPOL'
                    content='Como todo método multicriterio, el método Multipol pretende comparar diferentes acciones o soluciones a un problema en función de criterios y de políticas múltiples.'
                    />

            </Grid>
            
        </Box>
    )
}