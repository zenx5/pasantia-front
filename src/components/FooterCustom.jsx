import { Box, Typography } from '@mui/material'

export default function FooterCustom( props ){
    const { style, content } = props
    const defaultStyle = {
        color: '#fff',
        backgroundColor:'#808080',

        width:'100%',
        height:'40px',

        position: 'relative',
        display:'flex',
        justifyContent:'end',
        alignItems:'center',
        
    }
    
    return(<Box style={{ ...defaultStyle, ...style }}><Typography style={{ marginLeft:'5%', marginRight:'5%' }}>{content}</Typography></Box>)
}