import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'

export default function Contact(){

    return(<Grid container>
        <Grid item xs={12}>
            <Typography component='h1' style={{ fontSize:'4rem', fontWeight:'bold', textAlign:'center', margin:'20px' }}>Nuestro Equipo</Typography>
        </Grid>
        <Grid item xs={4}>
            <Card style={{ minHeight:'350px'}}>
                <CardHeader title={<Typography style={{ fontSize:'3rem', fontWeight:'bold' }}>Dr. Henry Izquierdo</Typography>}/>
                <CardContent>
                    <Typography style={{ fontSize:'1.5rem', textAlign:'center' }}>
                        Especialista en Metodologia, Planificación y Prospectiva
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent:'center'}}>
                    <Button style={{ color:'#fff', backgroundColor:'#a0a0a0', padding:'10px 50px' }}>Contact</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card style={{ minHeight:'350px'}}>
                <CardHeader title={<Typography style={{ fontSize:'3rem', fontWeight:'bold' }}>Aneli Solórzano</Typography>}/>
                <CardContent>
                    <Typography style={{ fontSize:'1.5rem', textAlign:'center' }}>
                        Desarrollador
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent:'center'}}>
                    <Button style={{ color:'#fff', backgroundColor:'#a0a0a0', padding:'10px 50px' }}>Contact</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card style={{ minHeight:'350px'}}>
                <CardHeader title={<Typography style={{ fontSize:'3rem', fontWeight:'bold' }}>Adrian Villaroel</Typography>}/>
                <CardContent>
                    <Typography style={{ fontSize:'1.5rem', textAlign:'center' }}>
                        Desarrollador
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent:'center'}}>
                    <Button style={{ color:'#fff', backgroundColor:'#a0a0a0', padding:'10px 50px' }}>Contact</Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>)
}