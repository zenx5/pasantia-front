import { useState } from 'react';
import { 
    Box, 
    Grid,
    Card, 
    CardActions, 
    CardContent, 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    OutlinedInput,
    InputAdornment, 
    IconButton } from '@mui/material'
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material'
import { trans, labels } from '../tools/common';

export default function Login( props ) {
    const [user, setuser] = useState('');
    const [pass, setpass] = useState('');
    const [ showPassword, setshowPassword ] = useState(false)
    const { error, onLogin } = props

    return (
        <Box style={{
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
        }}>

        <Card style={{
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '1px 1px 5px'
        }}>
            <CardContent style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TextField 
                    variant='outlined' 
                    label={trans(labels('username'))} 
                    style={{margin:'10px'}} 
                    value={user}
                    onChange={({target})=>setuser(prev=>target.value)} />
                <FormControl sx={{ m: '10px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={pass}
                        onChange={({target})=>setpass(prev=>target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={()=>setshowPassword(prev=>!showPassword)}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label={trans(labels('password'))} 
                    />
                </FormControl>
            </CardContent>
            <CardActions style={{justifyContent:'center'}}>
                <Grid container style={{marginBottom:'10px'}}>
                    <Grid item xs={1} style={{display:'flex', justifyContent:'end'}}>
                        <IconButton onClick={()=>{window.history.go(-1)}}>
                            <ArrowBack />                            
                        </IconButton>
                    </Grid>
                    <Grid item xs={11} style={{display:'flex', justifyContent:'center'}}>
                        <Button 
                            variant='contained'
                            onClick={()=>onLogin(user, pass)}
                            >{trans(labels('accept'))}</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
        </Box>
    );
}


