export const trans = ( string ) => {
    return string;
}

export const labels = ( key ) => {
    const strings = {
        username: 'Username',
        password: 'Password',
        accept: 'Accept',
    }
    return strings[ key ]
}