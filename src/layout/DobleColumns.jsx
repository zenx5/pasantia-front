import { useRef, useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";


export default function DobleColumns( props ){
    const [height, setHeight] = useState(0)
    const href= useRef()
    const fref= useRef()
    const { 
        header = <span></span>,
        footer = <span></span>,
        ColumnOne, 
        ColumnTwo,
        WidthOne,
        WidthTwo,
        StyleOne,
        StyleTwo,
        verticalCenter,
    } = props

    useEffect(()=>{
        const heigthHeader = href.current.children[0].clientHeight
        const heigthFooter = fref.current.children[0].clientHeight
        console.log( window.innerHeight, heigthHeader, heigthFooter, window.innerHeight - heigthHeader - heigthFooter )
        setHeight( prev => window.innerHeight - heigthHeader - heigthFooter )
    },[ header, footer ])

    const setRef = (element, ref) => {
        return(<span ref={ref}>{element}</span>)
    }

    return(
    <>
        { setRef(header, href) }
        <Box style={{ display:'flex', height: `${height}px`, overflowY:'auto', alignItems:(verticalCenter?'center':'auto') }}>
            <Grid container>
                <Grid item xs={ WidthOne } style={ StyleOne }>
                    { ColumnOne }
                </Grid>
                <Grid item xs={ WidthTwo } style={ StyleTwo }>
                { ColumnTwo }
                </Grid>
            </Grid>
        </Box>
        { setRef(footer,fref) }
    </>)
}