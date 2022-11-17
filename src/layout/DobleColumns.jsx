import { Box, Grid } from "@mui/material";



export default function DobleColumns( props ){
    const { 
        header,
        ColumnOne, 
        ColumnTwo,
        WidthOne,
        WidthTwo,
        StyleOne,
        StyleTwo
     } = props

    return(
    <>
        { header }
        <Box>
            <Grid container style={{ height: '100vh' }}>
                <Grid item xs={ WidthOne } style={ StyleOne }>
                    { ColumnOne }
                </Grid>
                <Grid item xs={ WidthTwo } style={ StyleTwo }>
                { ColumnTwo }
                </Grid>
            </Grid>
        </Box>
    </>)
}