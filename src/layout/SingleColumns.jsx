import { Box, Grid } from "@mui/material";



export default function DobleColumns( props ){
    const { 
        header,
        footer,
        Column, 
        Style,
     } = props

    return(
    <>
        { header }
        <Box>
            <Grid container style={{ height: '100vh' }}>
                <Grid item xs={ 12 } style={ Style }>
                { Column }
                </Grid>
            </Grid>
        </Box>
        { footer }
    </>)
}