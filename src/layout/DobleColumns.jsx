import { Box, Grid } from "@mui/material";



export default function DobleColumns( props ){
    const { 
        header,
        footer,
        ColumnOne, 
        ColumnTwo,
        WidthOne,
        WidthTwo,
        StyleOne,
        StyleTwo
     } = props

    return(
    <Box container style={{ height: '100%', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        { header }
        <Box style={{ height:'100%' }}>
            <Grid container>
                <Grid item xs={ WidthOne } style={ StyleOne }>
                    { ColumnOne }
                </Grid>
                <Grid item xs={ WidthTwo } style={ StyleTwo }>
                { ColumnTwo }
                </Grid>
            </Grid>
        </Box>
        { footer }
    </Box>)
}