import { Grid, Typography } from '@mui/material'

export default function Note(props){
    const { reverse, src, width, title, content } = props

    return (<Grid container style={{ margin:'30px 10px', display:'flex', flexDirection: reverse ? 'row-reverse' : 'row' }}>
        <Grid item xs={3} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            {src ? <img src={src} width={ width ?? 350} />
            :<Typography style={{fontSize:'50px', fontWeight:'bold', textAlign:'center'}}>{ title }</Typography>}
        </Grid>
        <Grid item xs={9}>
            {src!=undefined && <Typography style={{fontSize:'50px', fontWeight:'bold', textAlign:'center'}}>{ title }</Typography>}
            <Typography style={{margin:'10px', fontSize: '25px'}}>{ content }</Typography>
        </Grid>
    </Grid>)
}